import { NextResponse } from "next/server";
import { QUESTIONNAIRE_LIST } from "@/app/data/questions";

export async function GET() {
  try {
    return NextResponse.json({
      questionnaires: QUESTIONNAIRE_LIST,
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questionnaires" },
      { status: 500 }
    );
  }
}
