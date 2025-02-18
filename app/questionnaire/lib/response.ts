import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";
import { UserResponse } from "@/types/common";

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
 * Sends user response for a specific question.
 *
 * @param questionId - The unique identifier for the question.
 * @param response - An array of user response.
 * @returns A promise resolving with the result of the submission.
 */
export const sendResponse = async (questionId: string, response: UserResponse | UserResponse[]) => {
  if (!questionId) throw new Error("Question ID is required");
  if (!response) throw new Error("Response is required");

  return requestHandler(`${API_URL.RESPONSE}${questionId}`, {
    method: "POST",
    body: JSON.stringify({ response }),
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
