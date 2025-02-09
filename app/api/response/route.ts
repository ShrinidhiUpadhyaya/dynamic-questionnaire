// app/api/answers/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "../(config)/db";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { answers } = await request.json();

    const { searchParams } = new URL(request.url);

    const stmt = db.prepare(
      "INSERT OR REPLACE INTO answers (questionId, answer) VALUES (?, ?)"
    );
    stmt.run(questionId, answers);

    return NextResponse.json(
      { message: "Answers saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save answers" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return NextResponse.json(
        { error: "Question ID is required" },
        { status: 400 }
      );
    }

    const result = db
      .prepare("SELECT answer FROM answers WHERE questionId = ?")
      .get(questionId);

    return NextResponse.json(
      { answer: result ? result.answer : null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve answers" },
      { status: 500 }
    );
  }
}
