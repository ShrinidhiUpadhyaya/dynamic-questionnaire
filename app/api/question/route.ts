import { NextResponse } from "next/server";
import { QUESTIONNAIRE_LIST } from "@/app/data/questions";

export async function GET() {
  const questionnaires = QUESTIONNAIRE_LIST;

  return NextResponse.json({
    questionnaires,
  });
}
