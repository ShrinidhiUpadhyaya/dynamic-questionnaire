import { QUERY_CONFIG, QUERY_KEYS } from "@/app/config/queryConfig";
import { isCustomError } from "@/lib/isCustomError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getAllQuestions, getQuestions } from "../lib/questions";
import useQuestionStore from "../store/store";

export const useAllQuestions = (questionnaireId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.ALL_QUESTIONS],
    queryFn: () => getAllQuestions({ questionnaireId }),
  });

  return { data, isLoading, error };
};

export const useQuestion = (questionnaireId: string) => {
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const { setCurrentQuestionIndex, setTotalQuestions } = useQuestionStore();

  const batchIndex = Math.floor(currentIndex / QUERY_CONFIG.BATCH_SIZE);
  const offset = batchIndex * QUERY_CONFIG.BATCH_SIZE;

  const errorHandler = (error: unknown) => {
    if (isCustomError(error)) {
      setErrorStatus(error.status ?? null);
      throw error;
    } else {
      console.error("Unknown error fetching questions:", error);
      throw error;
    }
  };

  const queryConfig = useMemo(
    () => ({
      queryKey: [QUERY_KEYS.QUESTIONS, batchIndex, QUERY_CONFIG.BATCH_SIZE],
      queryFn: () =>
        getQuestions({ questionnaireId, offset, limit: QUERY_CONFIG.BATCH_SIZE }).catch(
          errorHandler,
        ),
      keepPreviousData: true,
      staleTime: QUERY_CONFIG.STALE_TIME,
      cacheTime: QUERY_CONFIG.CACHE_TIME,
      retry: QUERY_CONFIG.RETRY,
    }),
    [batchIndex, offset, questionnaireId],
  );

  const { data, isLoading, error } = useQuery(queryConfig);

  useEffect(() => {
    setCurrentQuestionIndex(currentIndex);
  }, [currentIndex, setCurrentQuestionIndex]);

  const questions = data?.data?.questions || [];
  const totalQuestions = data?.data?.total || 0;
  const currentQuestion = questions[currentIndex % QUERY_CONFIG.BATCH_SIZE];

  useEffect(() => {
    setTotalQuestions(totalQuestions);
  }, [totalQuestions, setTotalQuestions]);

  const goToNextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      if ((currentIndex + 1) % QUERY_CONFIG.BATCH_SIZE === 0) {
        const nextBatchIndex = batchIndex + 1;
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.QUESTIONS, nextBatchIndex, QUERY_CONFIG.BATCH_SIZE],
          queryFn: () =>
            getQuestions({
              questionnaireId,
              offset: nextBatchIndex * QUERY_CONFIG.BATCH_SIZE,
              limit: QUERY_CONFIG.BATCH_SIZE,
            }),
          staleTime: QUERY_CONFIG.STALE_TIME,
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
