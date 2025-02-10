import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

export const getResponse = async (questionId: string) => {
  if (!questionId) {
    throw new Error("Question ID is required");
  }
  return requestHandler(`${API_URL.RESPONSE}${questionId}`);
};
