import { API_URL } from "@/app/config/apiUrls";

export const getAllResponses = async () => {
  console.log("getAllResponses");
  const response = await fetch(`${API_URL.ALL_RESPONSES}`);
  if (!response.ok) {
    throw new Error("Failed to get response");
  }
  return response.json();
};
