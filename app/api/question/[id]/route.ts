import { NextResponse } from "next/server";
import { QUESTIONNAIRE_LIST } from "@/app/data/questions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { error: "Questionnaire ID is required" },
      { status: 400 }
    );
  }

  if (id === "all") {
    const questions = QUESTIONNAIRE_LIST.flatMap(
      (questionnaire) => questionnaire.questions
    );

    return NextResponse.json({
      questions,
      total: questions.length,
    });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  const questionnaire = QUESTIONNAIRE_LIST.find(
    (questionnaire) => questionnaire.id === id
  );

  const questions = questionnaire?.questions.slice(offset, offset + limit);

  if (!questionnaire) {
    return NextResponse.json(
      { error: "Questionnaire not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    questions,
    total: questionnaire?.questions.length,
  });
}
