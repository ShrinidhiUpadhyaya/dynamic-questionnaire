"use client";

import { getAllQuestions } from "@/app/questionnaire/lib/questions";
import { getAllResponses } from "@/app/questionnaire/lib/response";
import DLoadingComponent from "@/components/DLoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Answer } from "@/types/answer";
import { QuestionType } from "@/types/question";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

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
    queryFn: () => getAllQuestions({ questionnaireId: id as string }),
  });

  const { data: answersData, isLoading: isLoadingAnswers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAllResponses(),
  });

  const { questions } = questionsData?.questions ?? {};

  const combinedData = useMemo(() => {
    if (!questions || !answersData?.answers) return [];

    return questions.map((question: Question) => {
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

  const handleRestartQuiz = () => {
    router.push(`/questionnaire/${id}`);
  };

  const handleTakeAnotherQuestionnaire = () => {
    router.push("/questionnaire");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-16">
      <div className="w-full max-w-7xl space-y-16">
        <div className="flex flex-wrap justify-center gap-8">
          {combinedData.map((item: CombinedData) => (
            <Card
              key={item.id}
              className="w-full max-w-sm hover:shadow-lg transition-shadow"
            >
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
        <div className="flex flex-wrap items-center justify-center gap-8 flex-col md:flex-row">
          <Button
            variant="outline"
            onClick={() => handleTakeAnotherQuestionnaire()}
            className="w-full max-w-sm hover:shadow-lg transition-shadow"
          >
            Take Another Questionnaire
          </Button>
          <Button
            onClick={() => handleRestartQuiz()}
            className="w-full max-w-sm hover:shadow-lg transition-shadow"
          >
            Restart Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswersPage;
