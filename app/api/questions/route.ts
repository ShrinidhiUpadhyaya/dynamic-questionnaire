import { NextResponse } from "next/server";
import questionsData from "@/app/data/questions.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 1;
  const questions = questionsData.questions.slice(0, limit);
  return NextResponse.json({ questions });
}
