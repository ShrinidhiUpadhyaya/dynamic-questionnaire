import { API_URL } from "@/app/config/apiUrls";
export const getResponse = async (questionId: string) => {
  const response = await fetch(`${API_URL.RESPONSE}${questionId}`);
  if (!response.ok) {
    throw new Error("Failed to get response");
  }
  return response.json();
};
