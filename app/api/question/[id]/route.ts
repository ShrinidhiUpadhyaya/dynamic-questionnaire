import { QUESTIONNAIRE_LIST } from "@/app/data/questions";
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
      return NextResponse.json({ error: "Questionnaire ID is required" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const getAll = searchParams.get("all") === "true";

    if (getAll) {
      const questions = await getQuestionnaire(id);
      return NextResponse.json({
        questions,
        total: questions?.questions.length,
        status: "success",
      });
    }

    const limit = Number(searchParams.get("limit")) || 5;
    const offset = Number(searchParams.get("offset")) || 0;

    const result = await getPaginatedQuestions(id, limit, offset);
    if (!result.questions.length) {
      return NextResponse.json({ error: "Questionnaire not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...result,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    return NextResponse.json({ error: "Failed to fetch questionnaire" }, { status: 500 });
  }
}
