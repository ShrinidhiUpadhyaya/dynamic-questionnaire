// hooks/useAnswers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type UserAnswer = {
  value: string | number | null;
};

export const useResponse = (questionId: string) => {
  const {
    data: answerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["response", questionId],
    queryFn: async () => {
      const response = await fetch(`/api/response?questionId=${questionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch answers");
      }
      return response.json();
    },
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
  });

  return {
    answer: answerData?.answer || [],
    isLoading,
    error,
    saveAnswers,
    isSaving,
  };
};
