import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
      const response = await fetch(`/api/response?questionId=${questionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch answers");
      }
      return response.json();
    },
    staleTime: 30000,
  });

  const { mutate: saveAnswers, isPending: isSaving } = useMutation({
    mutationFn: async (answers: UserAnswer[]) => {
      const response = await fetch(`/api/response?questionId=${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to save answers");
      }
      return response.json();
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
