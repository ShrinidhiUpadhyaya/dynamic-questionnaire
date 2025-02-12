import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

/**
 * Fetches all available questionnaires.
 *
 * @returns A promise resolving to the list of questionnaires.
 */
export const getQuestionnaires = async () => {
  return requestHandler(API_URL.QUESTIONS);
};
