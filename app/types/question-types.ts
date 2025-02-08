import { TextQuestion } from "./text-types";
import { SingleChoiceQuestionType } from "./single-choice-types";

export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single_choice",
}

export interface BaseQuestion {
  id: string;
  title: string;
  type: QuestionType;
}

export type Question = TextQuestion | SingleChoiceQuestionType;

export interface Questionnaire {
  id: string;
  title: string;
  questions: Question[];
}
