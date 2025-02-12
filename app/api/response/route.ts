import { redis } from "@/lib/redis";
import { Answer } from "@/types/answer";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let answers: Answer[] = [];

const findAnswer = (id: string): Answer | undefined => {
  return answers.find((item) => item.id === id);
};

const upsertAnswer = (id: string, answer: string): void => {
  const existingIndex = answers.findIndex((item) => item.id === id);

  if (existingIndex !== -1) {
    answers[existingIndex] = { ...answers[existingIndex], answer };
  } else {
    answers = [...answers, { id, answer }];
  }
};

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { answers: userAnswer } = await request.json();

    if (!id || !userAnswer) {
      return NextResponse.json(
        { error: "Question ID and answer are required" },
        { status: 400 }
      );
    }

    if (redis) {
      await redis.hset(`answers:${id}`, "answer", userAnswer);
    } else {
      upsertAnswer(id, userAnswer);
    }

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
      if (redis) {
        const keys = await redis.keys("answers:*");
        const allAnswers = await Promise.all(
          keys.map(async (key) => ({
            id: key.replace("answers:", ""),
            answer: await redis.hget(key, "answer"),
          }))
        );

        return NextResponse.json({
          answers: allAnswers,
          total: allAnswers.length,
          status: "success",
        });
      }

      return NextResponse.json({
        answers,
        total: answers.length,
        status: "success",
      });
    }

    if (redis) {
      const answer = await redis.hget(`answers:${id}`, "answer");
      return NextResponse.json({
        answer: answer || null,
        status: "success",
      });
    }

    const result = findAnswer(id);
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

export async function DELETE() {
  try {
    if (redis) {
      const keys = await redis.keys("answers:*");
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } else {
      answers = [];
    }

    return NextResponse.json(
      { message: "All answers cleared successfully", status: "success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing answers:", error);
    return NextResponse.json(
      { error: "Failed to clear answers" },
      { status: 500 }
    );
  }
}
