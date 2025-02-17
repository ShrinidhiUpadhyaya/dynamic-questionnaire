import { QUERY_CONFIG, QUERY_KEYS } from "@/app/config/queryConfig";
import { UserAnswer } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllResponses, getResponse, sendResponse } from "../lib/response";

export const useAllResponses = () => {
  const queryKey = [QUERY_KEYS.ALL_RESPONSES];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getAllResponses(),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export const useResponse = (questionId: string) => {
  const queryClient = useQueryClient();

  const queryKey = [QUERY_KEYS.RESPONSE, questionId];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getResponse(questionId),
    staleTime: QUERY_CONFIG.STALE_TIME,
    enabled: !!questionId,
  });

  const { mutate: saveAnswers, isPending: isSaving } = useMutation({
    mutationFn: (answers: UserAnswer | UserAnswer[]) => sendResponse(questionId, answers),
    onMutate: async (newAnswers) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousAnswers = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, {
        answer: newAnswers,
      });

      return { previousAnswers };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousAnswers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return {
    answer: data?.answer,
    isLoading,
    error,
    saveAnswers,
    isSaving,
  };
};
