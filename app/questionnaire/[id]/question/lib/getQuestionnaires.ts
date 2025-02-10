import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

const getQuestionnaires = async () => {
  return requestHandler(API_URL.QUESTIONS);
};

export default getQuestionnaires;
