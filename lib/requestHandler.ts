import { CustomError } from "@/types/common";

const requestHandler = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: CustomError = new Error(errorData.message || `API error!`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default requestHandler;
