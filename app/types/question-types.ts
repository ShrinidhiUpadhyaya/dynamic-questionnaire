import { TextQuestion } from "./text-types";
import { SingleChoiceQuestionType } from "./single-choice-types";
import { MultipleChoiceQuestionType } from "./multiple-choice-types";

export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
}

export interface ConditionalRule {
  questionId: string;
  operator:
    | "equals"
    | "notEquals"
    | "contains"
    | "notContains"
    | "greaterThan"
    | "lessThan";
  value: string | number | boolean | string[];
  logic?: "and" | "or";
  conditions?: ConditionalRule[];
}

export interface BaseQuestion {
  id: string;
  question: string;
  type: QuestionType;
  conditional?: ConditionalRule;
}

export type Question =
  | TextQuestion
  | SingleChoiceQuestionType
  | MultipleChoiceQuestionType;

export interface Questionnaire {
  id: string;
  title: string;
  questions: Question[];
}
