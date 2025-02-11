"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../questionnaire/lib/getQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllResponses } from "../../questionnaire/lib/getAllResponses";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Answer } from "@/types/answer";
import { QuestionType } from "@/types/question";
import DLoadingComponent from "@/components/DLoadingComponent";

interface Question {
  id: string;
  question: string;
  type: QuestionType;
}

interface CombinedData {
  id: string;
  question: string;
  answer: string | string[] | null;
  type: QuestionType;
}

const AnswersPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: questionsData, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions({ questionnaireId: id as string }),
  });

  const { data: answersData, isLoading: isLoadingAnswers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAllResponses(),
  });

  const combinedData = useMemo(() => {
    if (!questionsData?.questions || !answersData?.answers) return [];

    return questionsData.questions.map((question: Question) => {
      const answer = answersData.answers.find(
        (ans: Answer) => ans.questionId === question.id
      );

      return {
        id: question.id,
        question: question.question,
        type: question.type,
        answer: answer ? answer.answer : null,
      };
    });
  }, [questionsData, answersData]);

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

  const handleRestartQuiz = () => {
    router.push(`/questionnaire/${id}`);
  };

  const handleTakeAnotherQuestionnaire = () => {
    router.push("/questionnaire");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {combinedData.map((item: CombinedData) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {item.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500">Answer:</p>
                <p className="mt-1 text-base">{formatAnswer(item.answer)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">
                  Question Type: {item.type}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Button
          variant="outline"
          onClick={() => handleTakeAnotherQuestionnaire()}
        >
          Take Another Questionnaire
        </Button>
        <Button onClick={() => handleRestartQuiz()}>Restart Quiz</Button>
      </div>
    </div>
  );
};

export default AnswersPage;
