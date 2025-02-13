"use client";

import { getAllQuestions } from "@/app/questionnaire/lib/questions";
import { deleteResponses, getAllResponses } from "@/app/questionnaire/lib/response";
import DLoadingComponent from "@/components/DLoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Answer, Question, QuestionTypeValues } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import { t } from "../../locales/translation";

interface CombinedData {
  id: string;
  question: string;
  answer: string | string[] | null;
  type: QuestionTypeValues;
}

const AnswersPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: questionsData, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllQuestions({ questionnaireId: id as string }),
  });

  const { data: answersData, isLoading: isLoadingAnswers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAllResponses(),
  });

  const queryClient = useQueryClient();

  const { questions } = questionsData?.questions ?? {};

  const combinedData = useMemo(() => {
    if (!questions || !answersData?.answers) return [];

    return questions.map((question: Question) => {
      const answer = answersData.answers.find((ans: Answer) => ans.id === question.id);

      return {
        id: question.id,
        question: question.question,
        type: question.type,
        answer: answer ? answer.answer : null,
      };
    });
  }, [questions, answersData]);

  const formatAnswer = (answer: string | string[] | null) => {
    if (!answer) return "No answer provided";

    if (Array.isArray(answer)) {
      return answer.join(", ");
    }

    return answer.toString();
  };

  if (isLoadingQuestions || isLoadingAnswers) {
    return <DLoadingComponent />;
  }

  const handleRestartQuiz = async () => {
    await deleteResponses();
    queryClient.removeQueries({ queryKey: ["response"] });
    router.push(`/questionnaire/${id}`);
  };

  const handleTakeAnotherQuestionnaire = () => {
    router.push("/questionnaire");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 sm:p-16">
      <div className="w-full max-w-7xl space-y-16">
        <div className="flex flex-wrap justify-center gap-8">
          {combinedData.map((item: CombinedData) => (
            <Card
              key={item.id}
              className="flex w-full max-w-sm flex-col justify-between transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary-foreground">
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="text-sm font-medium">
                  Answer:{" "}
                  <span className="mt-1 text-base font-bold capitalize text-primary">
                    {formatAnswer(item.answer)}
                  </span>
                </Label>
                <Label className="block text-xs">Question Type: {item.type}</Label>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row">
          <Button
            variant="outline"
            onClick={() => handleTakeAnotherQuestionnaire()}
            className="w-full max-w-sm transition-shadow hover:shadow-lg">
            Take Another Questionnaire
          </Button>
          <Button
            onClick={() => handleRestartQuiz()}
            className="w-full max-w-sm transition-shadow hover:shadow-lg">
            {t("restart")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswersPage;
