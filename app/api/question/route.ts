import { NextResponse } from "next/server";
import { INITIAL_QUESTIONS } from "@/app/data/questions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  const questions = INITIAL_QUESTIONS.questions.slice(offset, offset + limit);

  return NextResponse.json({
    questions,
    total: INITIAL_QUESTIONS.questions.length,
  });
}
