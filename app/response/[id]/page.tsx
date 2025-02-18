"use client";

import { useAllResponses } from "@/app/questionnaire/hooks/useResponse";
import { getAllQuestions } from "@/app/questionnaire/lib/questions";
import { deleteResponses } from "@/app/questionnaire/lib/response";
import DErrorPage from "@/components/DErrorPage";
import DLoadingComponent from "@/components/DLoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CustomError, Question, QuestionTypeValues, Response } from "@/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import { t } from "../../locales/translation";

interface CombinedData {
  id: string;
  question: string;
  response: string | string[] | null;
  type: QuestionTypeValues;
}

const ResponsePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllQuestions({ questionnaireId: id as string }),
  });

  const {
    data: responsesData,
    isLoading: isLoadingResponses,
    error: errorResponses,
  } = useAllResponses();
  const queryClient = useQueryClient();

  const { questions } = questionsData?.data?.questions ?? {};

  const combinedData = useMemo(() => {
    if (!questions || !responsesData?.responses) return [];

    return questions.map((question: Question) => {
      const response = responsesData.responses.find((ans: Response) => ans.id === question.id);

      return {
        id: question.id,
        question: question.question,
        type: question.type,
        response: response ? response.response : null,
      };
    });
  }, [questions, responsesData]);

  const formatResponse = (response: string | string[] | null) => {
    if (!response) return "No response provided";

    if (Array.isArray(response)) {
      return response.join(", ");
    }

    return response.toString();
  };

  const handleRestartQuiz = async () => {
    await deleteResponses();
    queryClient.removeQueries({ queryKey: ["response"] });
    router.push(`/questionnaire/${id}`);
  };

  const handleTakeAnotherQuestionnaire = () => {
    router.push("/questionnaire");
  };

  if (isLoadingQuestions || isLoadingResponses) {
    return <DLoadingComponent />;
  }

  if (errorQuestions || errorResponses) {
    return <DErrorPage error={errorQuestions as CustomError} />;
  }

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
                  Response:{" "}
                  <span className="mt-1 text-base font-bold capitalize text-primary">
                    {formatResponse(item.response)}
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

export default ResponsePage;
