import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../lib/getQuestions";
import { useState } from "react";

const BATCH_SIZE = 5;

export const useQuestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const batchIndex = Math.floor(currentIndex / BATCH_SIZE);

  const offset = batchIndex * BATCH_SIZE;

  const {
    data: questionnaire,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["questions", batchIndex, BATCH_SIZE],
    queryFn: () => getQuestions({ offset: offset, limit: BATCH_SIZE }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const question = questionnaire?.questions || [];
  const totalQuestions = questionnaire?.total || 0;

  const currentQuestion = question[currentIndex];

  const goToNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return {
    currentQuestion,
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: currentIndex === totalQuestions - 1,
    totalQuestions,
    isLoading,
    isError,
    error,
    goToNextQuestion,
    goToPreviousQuestion,
    currentIndex,
  };
};
