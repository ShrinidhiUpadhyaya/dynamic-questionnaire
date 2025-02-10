import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";
import { UserAnswer } from "@/types/answer";

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
