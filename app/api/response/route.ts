// app/api/answers/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "../(config)/db";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { answers } = await request.json();
    const { value } = answers;

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("questionId");

    console.log("1231231231231312313123", questionId, answers);

    const stmt = db.prepare(
      "INSERT OR REPLACE INTO answers (questionId, answer) VALUES (?, ?)"
    );
    stmt.run(questionId, JSON.stringify(value));

    return NextResponse.json(
      { message: "Answers saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving answers:", error);
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
    console.log("@@");
    console.log(questionId);
    const allAnswers = db.prepare("SELECT * FROM answers").all();
    console.log("allAnswers", allAnswers);
    const result = db
      .prepare("SELECT answer FROM answers WHERE questionId = ?")
      .get(questionId);

    console.log(result);
    if (!result)
      return NextResponse.json({ error: "Answer not found" }, { status: 404 });

    return NextResponse.json({ answer: result.answer }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving answers:", error);
    return NextResponse.json(
      { error: "Failed to retrieve answers" },
      { status: 500 }
    );
  }
}
