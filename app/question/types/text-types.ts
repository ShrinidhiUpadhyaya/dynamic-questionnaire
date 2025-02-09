import { BaseQuestion, QuestionType } from "./question-types";

export enum TextSubType {
  NUMBER = "number",
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
}

interface TextQuestionBase extends BaseQuestion {
  type: QuestionType.TEXT;
  sub_type: TextSubType;
  validation?: {
    pattern?: string;
    errorMessage?: string;
  };
}

export interface NumberQuestion extends TextQuestionBase {
  sub_type: TextSubType.NUMBER;
  min: number;
  max: number;
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

export type TextQuestion =
  | NumberQuestion
  | ShortTextQuestion
  | LongTextQuestion;

// Component Types
export interface TextQuestionProps {
  question: TextQuestion;
  answer: string;
  onChange: (value: string) => void;
}

export interface BaseInputProps {
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  error?: string;
}

export interface ShortTextInputProps extends BaseInputProps {
  minLength?: number;
  maxLength?: number;
}

export interface LongTextInputProps extends BaseInputProps {
  minLength?: number;
  maxLength?: number;
}

export interface NumberInputProps extends BaseInputProps {
  min?: number;
  max?: number;
}
