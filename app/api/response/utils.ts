import { NextRequest, NextResponse } from "next/server";

export const createErrorResponse = (
  message: string,
  status = 500
): NextResponse => {
  return NextResponse.json({ error: message }, { status });
};

export const validateQuestionId = (questionId: string | null): string => {
  if (!questionId) {
    throw new Error("Question ID is required");
  }
  return questionId;
};

export const getQuestionId = (request: NextRequest): string => {
  const { searchParams } = new URL(request.url);
  return validateQuestionId(searchParams.get("questionId"));
};
