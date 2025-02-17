import { QUESTIONNAIRE_LIST } from "@/app/data/questions";
import { HTTP_STATUS, createErrorResponse, createSuccessResponse } from "@/lib/api/response";
import { Question, Questionnaire } from "@/types/common";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

const getQuestionnaire = cache(async (id: string): Promise<Questionnaire | null> => {
  return QUESTIONNAIRE_LIST.find((q) => q.id === id) ?? null;
});

const getPaginatedQuestions = cache(
  async (
    id: string,
    limit: number = 5,
    offset: number = 0,
  ): Promise<{ questions: Question[]; total: number }> => {
    const questionnaire = await getQuestionnaire(id);
    if (!questionnaire) return { questions: [], total: 0 };

    return {
      questions: questionnaire.questions.slice(offset, offset + limit),
      total: questionnaire.questions.length,
    };
  },
);

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Questionnaire ID is required" },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const { searchParams } = new URL(request.url);
    const getAll = searchParams.get("all") === "true";

    if (getAll) {
      const questions = await getQuestionnaire(id);

      return createSuccessResponse({
        questions,
        total: questions?.questions.length,
      });
    }

    const limit = Number(searchParams.get("limit")) || 5;
    const offset = Number(searchParams.get("offset")) || 0;

    const result = await getPaginatedQuestions(id, limit, offset);
    if (!result.questions.length) {
      return createErrorResponse("Questionnaire not found", HTTP_STATUS.NOT_FOUND);
    }

    return createSuccessResponse(result);
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    return createErrorResponse("Failed to fetch questionnaire", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
