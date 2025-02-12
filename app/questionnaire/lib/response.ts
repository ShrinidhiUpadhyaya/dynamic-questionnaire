import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";
import { UserAnswer } from "@/types/answer";

/**
 * Fetches the response for a specific question.
 *
 * @param questionId - The unique identifier for the question.
 * @returns A promise resolving with the fetched response.
 */
export const getResponse = async (questionId: string) => {
  if (!questionId) {
    throw new Error("Question ID is required");
  }
  return requestHandler(`${API_URL.RESPONSE}${questionId}`);
};

/**
 * Sends user answers for a specific question.
 *
 * @param questionId - The unique identifier for the question.
 * @param answers - An array of user answers.
 * @returns A promise resolving with the result of the submission.
 */
export const sendResponse = async (
  questionId: string,
  answers: UserAnswer[]
) => {
  if (!questionId) throw new Error("Question ID is required");
  if (!answers?.length) throw new Error("Answers are required");

  return requestHandler(`${API_URL.RESPONSE}${questionId}`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
};

/**
 * Fetches all responses.
 *
 * @returns A promise resolving with all responses.
 */
export const getAllResponses = async () => {
  return requestHandler(API_URL.ALL_RESPONSES);
};

/**
 * Deletes all user responses.
 *
 * @returns A promise resolving with the result of the deletion.
 */
export const deleteResponses = async () => {
  return requestHandler(API_URL.RESPONSE, {
    method: "DELETE",
  });
};
