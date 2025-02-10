import { createContext, useContext, useMemo } from "react";
import { Question } from "@/app/questionnaire/[id]/question/types/question-types";
import { useResponse } from "@/app/questionnaire/[id]/question/hooks/useResponse";
import { useQuestion } from "@/app/questionnaire/[id]/question/hooks/useQuestion";
import { useParams } from "next/navigation";
interface QuestionContextType {
  currentQuestion: Question | null;
  answer: string | string[] | null;
  saveAnswer: (value: string | string[]) => Promise<void>;
  goToNext: () => void;
  goToPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isLoading: boolean;
  error: Error | null;
}

const QuestionContext = createContext<QuestionContextType | null>(null);

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestion(id);

  const { answer, saveAnswers } = useResponse(id);

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
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestionContext must be used within QuestionProvider");
  }
  return context;
};
