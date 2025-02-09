import { API_URL } from "@/app/config/apiUrls";
export const sendResponse = async (questionId: string, answers: any[]) => {
  const response = await fetch(`${API_URL.RESPONSE}${questionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error("Failed to send response");
  }

  return response.json();
};
