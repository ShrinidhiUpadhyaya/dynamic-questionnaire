export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
}

export interface ConditionalRule {
  questionId: string;
  operator: "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan";
  value: string | number | boolean | string[];
  logic?: "and" | "or";
}

export interface BaseQuestion {
  id: string;
  question: string;
  type: QuestionType;
  conditional?: ConditionalRule[];
}

export enum TextSubType {
  NUMBER_TEXT = "number_text",
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
  sub_type: TextSubType.NUMBER_TEXT;
  min: number;
  max: number;
}

export type TextQuestionType = NumberQuestion | ShortTextQuestion | LongTextQuestion;

export enum SingleChoiceSubType {
  RADIO = "radio",
  SELECT = "select",
}

export interface QuestionOptionsType {
  id: string;
  label: string;
  value: string;
}

export interface SingleChoiceQuestionType extends BaseQuestion {
  sub_type: SingleChoiceSubType;
  options: QuestionOptionsType[];
}

export enum MultipleChoiceSubType {
  CHECKBOX = "checkbox",
}

export interface MultipleChoiceQuestionType extends BaseQuestion {
  sub_type: MultipleChoiceSubType;
  options: QuestionOptionsType[];
}

export type Question = TextQuestionType | SingleChoiceQuestionType | MultipleChoiceQuestionType;

export interface Questionnaire {
  id: string;
  title: string;
  questions: Question[];
}
