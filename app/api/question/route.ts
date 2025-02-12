import { QUESTIONNAIRE_LIST } from "@/app/data/questions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      questionnaires: QUESTIONNAIRE_LIST,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching questionnaires:", error); 
    return NextResponse.json(
      { error: "Failed to fetch questionnaires" },
      { status: 500 }
    );
  }
}
