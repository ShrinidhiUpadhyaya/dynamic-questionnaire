"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../questionnaire/[id]/question/lib/getQuestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllResponses } from "../../questionnaire/[id]/question/lib/getAllResponses";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

interface Question {
  id: string;
  question: string;
}

interface Answer {
  questionId: string;
  answer: string | string[];
}

interface CombinedData {
  id: string;
  question: string;
  answer: string | string[] | null;
  type: string;
}

const AnswersPage = () => {
  const { id } = useParams();
  const { data: questionsData, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions({ questionnaireId: id as string }),
  });

  const { data: answersData, isLoading: isLoadingAnswers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAllResponses(),
  });

  // Combine questions and answers
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

  // Format answer for display
  const formatAnswer = (answer: string | string[] | null, type: string) => {
    if (!answer) return "No answer provided";

    if (Array.isArray(answer)) {
      return answer.join(", ");
    }

    return answer.toString();
  };

  if (isLoadingQuestions || isLoadingAnswers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

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
                <p className="mt-1 text-base">
                  {formatAnswer(item.answer, item.type)}
                </p>
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
      <Button>Restart Quiz</Button>
    </div>
  );
};

export default AnswersPage;
