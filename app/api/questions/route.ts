import { NextResponse } from "next/server";
import questionsData from "@/app/data/questions.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 5;
  const offset = Number(searchParams.get("offset")) || 0;

  const questions = questionsData.questions.slice(offset, offset + limit);

  return NextResponse.json({
    questions,
    total: questionsData.questions.length,
  });
}
