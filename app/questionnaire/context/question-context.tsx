import { useQuestion } from "@/app/questionnaire/hooks/useQuestion";
import { useResponse } from "@/app/questionnaire/hooks/useResponse";
import { Question, UserResponse } from "@/types/common";
import { UseMutateFunction } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

import { useConditionalLogic } from "../hooks/useConditionalLogic";

interface QuestionContextType {
  currentQuestion: Question;
  response: string | string[];
  showQuestion: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isLoading: boolean;
  error: Error | null;
  errorStatus: number | null;
  saveResponse:
    | UseMutateFunction<any, Error, UserResponse | UserResponse[], { previousResponses: unknown }>
    | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
}

const QuestionContext = createContext<QuestionContextType | null>(null);

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    errorStatus,
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestion(id as string);

  const { response, saveResponse } = useResponse(currentQuestion?.id as string);

  const showQuestion = useConditionalLogic(currentQuestion, response?.response);

  const contextValue = useMemo(
    () => ({
      isLoading,
      currentQuestion,
      response,
      showQuestion,
      error,
      errorStatus,
      isFirstQuestion,
      isLastQuestion,
      saveResponse: saveResponse,
      goToNext: goToNextQuestion,
      goToPrevious: goToPreviousQuestion,
    }),
    [
      isLoading,
      currentQuestion,
      response,
      showQuestion,
      error,
      errorStatus,
      isFirstQuestion,
      isLastQuestion,
      saveResponse,
      goToNextQuestion,
      goToPreviousQuestion,
    ],
  );

  return <QuestionContext.Provider value={contextValue}>{children}</QuestionContext.Provider>;
};

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestionContext must be used within QuestionProvider");
  }
  return context;
};
