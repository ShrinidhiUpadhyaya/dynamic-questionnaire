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

export enum TextSubType {
  NUMBER = "number",
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
}

export interface TextQuestionBase extends BaseQuestion {
  type: QuestionType.TEXT;
  sub_type: TextSubType;
  validation?: {
    pattern?: string;
    errorMessage?: string;
  };
}

export interface ShortTextQuestion extends TextQuestionBase {
  sub_type: TextSubType.SHORT_TEXT;
  minLength?: number;
  maxLength?: number;
}

export interface LongTextQuestion extends TextQuestionBase {
  sub_type: TextSubType.LONG_TEXT;
  minLength?: number;
  maxLength?: number;
}

export interface NumberQuestion extends TextQuestionBase {
  sub_type: TextSubType.NUMBER;
  min: number;
  max: number;
}

export enum SingleChoiceSubType {
  RADIO = "radio",
  SELECT = "select",
}

export interface SingleChoiceOptionType {
  id: string;
  label: string;
  value: string;
}

export interface SingleChoiceQuestionType extends BaseQuestion {
  sub_type: SingleChoiceSubType;
  options: SingleChoiceOptionType[];
}

export enum MultipleChoiceSubType {
  CHECKBOX = "checkbox",
}

export interface MultipleChoiceOptionType {
  id: string;
  label: string;
  value: string;
}

export interface MultipleChoiceQuestionType extends BaseQuestion {
  sub_type: MultipleChoiceSubType;
  options: MultipleChoiceOptionType[];
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
