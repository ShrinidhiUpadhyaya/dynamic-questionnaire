import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { redis } from "@/lib/redis"; // Assuming Redis for persistence
import { Answer } from "@/types/answer";

let answers: Answer[] = [];

const findAnswer = (questionId: string): Answer | undefined => {
  return answers.find((item) => item.questionId === questionId);
};

const upsertAnswer = (questionId: string, answer: string): void => {
  const existingIndex = answers.findIndex(
    (item) => item.questionId === questionId
  );

  if (existingIndex !== -1) {
    answers[existingIndex] = { ...answers[existingIndex], answer };
  } else {
    answers = [...answers, { questionId, answer }];
  }
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { answers } = await request.json();

    if (!id || !answers) {
      return NextResponse.json(
        { error: "Question ID and answer are required" },
        { status: 400 }
      );
    }

    // await redis.hSet(`answers:${id}`, { answer });

    upsertAnswer(id, answers);

    return NextResponse.json(
      { message: "Answer saved successfully", status: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json(
      { error: "Failed to save answer" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id === "all") {
      // const allAnswers = await redis.hGetAll("answers:*");
      return NextResponse.json({
        answers: answers,
        total: answers.length,
        status: "success",
      });
    }

    // const answer = await redis.hGetAll(`answers:${questionId}`);
    const result = findAnswer(id as string);

    return NextResponse.json({
      answer: result ? result.answer : null,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
