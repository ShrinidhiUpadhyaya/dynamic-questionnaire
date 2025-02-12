import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

/**
 * Fetches a paginated list of questions for a specific questionnaire.
 *
 * @param params - An object containing query parameters.
 * @param params.questionnaireId - The unique identifier for the questionnaire.
 * @param params.offset - (Optional) The number of questions to skip (for pagination).
 * @param params.limit - (Optional) The maximum number of questions to fetch (defaults to 5 if not provided).
 * @returns A promise resolving to the list of questions.
 */
export const getQuestions = async (params: {
  questionnaireId: string;
  offset?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams({
    limit: params?.limit?.toString() || "5",
    ...(params?.offset && { offset: params.offset.toString() }),
  });

  return requestHandler(
    `${API_URL.QUESTIONS}/${params.questionnaireId}?${queryParams}`
  );
};

/**
 * Fetches all questions for a specific questionnaire without pagination.
 *
 * @param params - An object containing the questionnaire identifier.
 * @param params.questionnaireId - The unique identifier for the questionnaire.
 * @returns A promise resolving to all questions for the specified questionnaire.
 */
export const getAllQuestions = async (params: { questionnaireId: string }) => {
  return requestHandler(
    `${API_URL.QUESTIONS}/${params.questionnaireId}?all=true`
  );
};
