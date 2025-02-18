import { QUERY_CONFIG, QUERY_KEYS } from "@/app/config/queryConfig";
import { UserResponse } from "@/types/common";
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

  const { mutate: saveResponse, isPending: isSaving } = useMutation({
    mutationFn: (response: UserResponse | UserResponse[]) => sendResponse(questionId, response),
    onMutate: async (newResponse) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousResponses = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, {
        response: newResponse,
      });

      return { previousResponses };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousResponses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return {
    response: data?.response,
    isLoading,
    error,
    saveResponse,
    isSaving,
  };
};
