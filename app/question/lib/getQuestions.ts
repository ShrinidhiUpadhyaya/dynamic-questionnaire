import { API_URL } from "@/app/config/apiUrls";

interface Question {
  id: number;
}

interface QuestionsResponse {
  questions: Question[];
  total: number;
}

export const getQuestions = async (params: {
  offset: number;
  limit: number;
}) => {
  const queryParams = new URLSearchParams({
    limit: params.limit.toString(),
    ...(params.offset && { offset: params.offset.toString() }),
  });

  const response = await fetch(`${API_URL.QUESTIONS}?${queryParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json() as Promise<QuestionsResponse>;
};
