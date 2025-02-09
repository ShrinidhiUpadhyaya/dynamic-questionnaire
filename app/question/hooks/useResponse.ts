import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sendResponse } from "../lib/sendResponse";
import { getResponse } from "../lib/getResponse";

type UserAnswer = {
  value: string | number | null;
};

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
    mutationFn: async (answers: UserAnswer[]) => {
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

  return {
    answer: answerData?.answer || [],
    isLoading,
    error,
    saveAnswers,
    isSaving,
  };
};
