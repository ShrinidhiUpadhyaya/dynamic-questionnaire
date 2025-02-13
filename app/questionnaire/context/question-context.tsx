import { useQuestion } from "@/app/questionnaire/hooks/useQuestion";
import { useResponse } from "@/app/questionnaire/hooks/useResponse";
import { UserAnswer } from "@/types/common";
import { Question } from "@/types/common";
import { UseMutateFunction } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

interface QuestionContextType {
  currentQuestion: Question;
  answer: string | string[];
  saveAnswer:
    | UseMutateFunction<any, Error, UserAnswer | UserAnswer[], { previousAnswers: unknown }>
    | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isLoading: boolean;
  error: Error | null;
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
  const answer = response?.answer;
  const saveAnswers = response?.saveAnswers;

  const contextValue = useMemo(
    () => ({
      isLoading,
      error,
      currentQuestion,
      answer,
      saveAnswer: saveAnswers,
      goToNext: goToNextQuestion,
      goToPrevious: goToPreviousQuestion,
      isFirstQuestion,
      isLastQuestion,
    }),
    [
      currentQuestion,
      answer,
      saveAnswers,
      goToNextQuestion,
      goToPreviousQuestion,
      isFirstQuestion,
      isLastQuestion,
      isLoading,
      error,
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
