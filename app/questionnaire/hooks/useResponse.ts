import { UserAnswer } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getResponse, sendResponse } from "../lib/response";

export const useResponse = (questionId: string) => {
  const queryClient = useQueryClient();

  const queryKey = ["response", questionId];

  const {
    data: answerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await getResponse(questionId);
      return response;
    },
    staleTime: 30000,
  });

  const { mutate: saveAnswers, isPending: isSaving } = useMutation({
    mutationFn: async (answers: UserAnswer | UserAnswer[]) => {
      const response = await sendResponse(questionId, answers);
      return response;
    },
    onMutate: async (newAnswers) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousAnswers = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, {
        answer: newAnswers,
      });

      return { previousAnswers };
    },
    onError: (err, newAnswers, context) => {
      queryClient.setQueryData(queryKey, context?.previousAnswers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  if (!questionId) {
    return null;
  }

  return {
    answer: answerData?.answer,
    isLoading,
    error,
    saveAnswers,
    isSaving,
  };
};
