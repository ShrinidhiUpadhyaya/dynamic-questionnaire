import { QUESTIONNAIRE_LIST } from "@/app/data/questions";
import { HTTP_STATUS, createErrorResponse, createSuccessResponse } from "@/lib/api/response";

export async function GET() {
  try {
    return createSuccessResponse(QUESTIONNAIRE_LIST);
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    return createErrorResponse("Failed to fetch questionnaires", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
