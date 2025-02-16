import { isCustomError } from "@/lib/isCustomError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getQuestions } from "../lib/questions";
import useQuestionStore from "../store/store";

const BATCH_SIZE = 2;
const STALE_TIME = 5 * 60 * 1000;
const CACHE_TIME = 30 * 60 * 1000;

export const useQuestion = (questionnaireId: string) => {
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const { setCurrentQuestionIndex, setTotalQuestions } = useQuestionStore();

  const batchIndex = useMemo(() => Math.floor(currentIndex / BATCH_SIZE), [currentIndex]);
  const offset = useMemo(() => batchIndex * BATCH_SIZE, [batchIndex]);

  const errorHandler = (error: unknown) => {
    if (isCustomError(error)) {
      console.log("Error fetching questions:", error.status);
      setErrorStatus(error.status ?? null);
      throw error;
    } else {
      console.error("Unknown error fetching questions:", error);
      throw error;
    }
  };

  const queryConfig = useMemo(
    () => ({
      queryKey: ["questions", batchIndex, BATCH_SIZE],
      queryFn: () =>
        getQuestions({ questionnaireId, offset, limit: BATCH_SIZE }).catch(errorHandler),
      keepPreviousData: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      retry: 2,
    }),
    [batchIndex, offset, questionnaireId],
  );

  const { data: questionnaire, isLoading, error } = useQuery(queryConfig);

  useEffect(() => {
    setCurrentQuestionIndex(currentIndex);
  }, [currentIndex, setCurrentQuestionIndex]);

  const questions = questionnaire?.questions || [];
  const totalQuestions = questionnaire?.total || 0;
  const currentQuestion = questions[currentIndex % BATCH_SIZE];

  useEffect(() => {
    setTotalQuestions(totalQuestions);
  }, [totalQuestions, setTotalQuestions]);

  const goToNextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      if ((currentIndex + 1) % BATCH_SIZE === 0) {
        const nextBatchIndex = batchIndex + 1;
        queryClient.prefetchQuery({
          queryKey: ["questions", nextBatchIndex, BATCH_SIZE],
          queryFn: () =>
            getQuestions({
              questionnaireId,
              offset: nextBatchIndex * BATCH_SIZE,
              limit: BATCH_SIZE,
            }),
          staleTime: STALE_TIME,
        });
      }
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalQuestions, questionnaireId, batchIndex, queryClient]);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  return useMemo(
    () => ({
      currentQuestion,
      isFirstQuestion: currentIndex === 0,
      isLastQuestion: currentIndex === totalQuestions - 1,
      totalQuestions,
      isLoading,
      error,
      errorStatus,
      goToNextQuestion,
      goToPreviousQuestion,
      currentIndex,
    }),
    [
      currentQuestion,
      currentIndex,
      totalQuestions,
      isLoading,
      error,
      errorStatus,
      goToNextQuestion,
      goToPreviousQuestion,
    ],
  );
};
