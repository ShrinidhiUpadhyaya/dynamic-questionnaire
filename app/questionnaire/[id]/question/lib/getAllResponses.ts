import { API_URL } from "@/app/config/apiUrls";
import requestHandler from "@/lib/requestHandler";

export const getAllResponses = async () => {
  return requestHandler(API_URL.ALL_RESPONSES);
};
