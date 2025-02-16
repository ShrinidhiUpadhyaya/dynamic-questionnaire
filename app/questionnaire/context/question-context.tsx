import { useQuestion } from "@/app/questionnaire/hooks/useQuestion";
import { useResponse } from "@/app/questionnaire/hooks/useResponse";
import { Question, UserAnswer } from "@/types/common";
import { UseMutateFunction } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

import { useConditionalLogic } from "../hooks/useConditionalLogic";

interface QuestionContextType {
  currentQuestion: Question;
  answer: string | string[];
  showQuestion: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isLoading: boolean;
  error: Error | null;
  saveAnswer:
    | UseMutateFunction<any, Error, UserAnswer | UserAnswer[], { previousAnswers: unknown }>
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
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestion(id as string);

  const response = useResponse(currentQuestion?.id as string);

  const showQuestion = useConditionalLogic(currentQuestion, response?.answer);

  const answer = response?.answer;
  const saveAnswers = response?.saveAnswers;

  const contextValue = useMemo(
    () => ({
      isLoading,
      error,
      currentQuestion,
      answer,
      showQuestion,
      isFirstQuestion,
      isLastQuestion,
      saveAnswer: saveAnswers,
      goToNext: goToNextQuestion,
      goToPrevious: goToPreviousQuestion,
    }),
    [
      isLoading,
      error,
      currentQuestion,
      answer,
      showQuestion,
      isFirstQuestion,
      isLastQuestion,
      saveAnswers,
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
