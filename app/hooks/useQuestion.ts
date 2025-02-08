import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestions } from "../lib/getQuestions";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const BATCH_SIZE = 5;

export const useQuestion = () => {
  const params = useParams();
  const currentQuestionId = Number(params?.questionId) || 0;
  const batchIndex = Math.floor(currentQuestionId / BATCH_SIZE);
  const queryClient = useQueryClient();

  const offset = batchIndex * BATCH_SIZE;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["questions", batchIndex, BATCH_SIZE],
    queryFn: () => getQuestions({ offset: offset, limit: BATCH_SIZE }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    const indexInBatch = currentQuestionId - offset;

    if (indexInBatch >= BATCH_SIZE - 2) {
      const nextBatchIndex = batchIndex + 1;
      queryClient.prefetchQuery({
        queryKey: ["questions", nextBatchIndex, BATCH_SIZE],
        queryFn: () =>
          getQuestions({
            offset: nextBatchIndex * BATCH_SIZE,
            limit: BATCH_SIZE,
          }),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [data, currentQuestionId, offset, batchIndex, queryClient]);

  const currentQuestion = data?.questions?.find(
    (q) => Number(q.id) === currentQuestionId
  );

  return {
    currentQuestion,
    isFirstQuestion: currentQuestionId === 0,
    isLastQuestion: data?.total ? currentQuestionId === data.total - 1 : false,
    totalQuestions: data?.total || 0,
    isLoading,
    error,
  };
};
