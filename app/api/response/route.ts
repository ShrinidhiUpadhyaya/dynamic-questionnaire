import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getQuestionId, createErrorResponse } from "./utils";

interface Answer {
  questionId: string;
  answer: string | string[];
}

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

export async function POST(request: NextRequest) {
  try {
    const questionId = getQuestionId(request);
    const { answers: newAnswer } = await request.json();

    if (!answers) {
      return createErrorResponse("Answers are required", 400);
    }

    upsertAnswer(questionId, newAnswer);

    return NextResponse.json(
      { message: "Answers saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return createErrorResponse("Failed to retrieve answers");
  }
}

export async function GET(request: NextRequest) {
  try {
    const questionId = getQuestionId(request);

    if (questionId === "all") {
      return NextResponse.json(
        {
          answers,
          totalAnswers: answers.length,
        },
        { status: 200 }
      );
    }

    const result = findAnswer(questionId);

    return NextResponse.json(
      { answer: result ? result.answer : null },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET request:", error);
    return createErrorResponse("Failed to retrieve answers");
  }
}
