import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

export const getQuestions = async (params: {
  questionnaireId: string;
  offset: number;
  limit: number;
}) => {
  const queryParams = new URLSearchParams({
    limit: params.limit.toString(),
    ...(params.offset && { offset: params.offset.toString() }),
  });

  return requestHandler(
    `${API_URL.QUESTIONS}/${params.questionnaireId}?${queryParams}`
  );
};
