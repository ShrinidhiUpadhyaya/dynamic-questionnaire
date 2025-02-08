import { BaseQuestion, QuestionType } from "./question-types";

export enum TextSubType {
  NUMBER = "number",
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
}

interface TextQuestionBase extends BaseQuestion {
  type: QuestionType.TEXT;
  sub_type: TextSubType;
}

export interface NumberQuestion extends TextQuestionBase {
  sub_type: TextSubType.NUMBER;
  min: number;
  max: number;
}

export interface ShortTextQuestion extends TextQuestionBase {
  sub_type: TextSubType.SHORT_TEXT;
  minLength: number;
  maxLength: number;
}

export interface LongTextQuestion extends TextQuestionBase {
  sub_type: TextSubType.LONG_TEXT;
  minLength: number;
  maxLength: number;
}

export type TextQuestion =
  | NumberQuestion
  | ShortTextQuestion
  | LongTextQuestion;

export interface BaseInputProps {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
}

export interface NumberInputProps
  extends Omit<BaseInputProps, "minLength" | "maxLength"> {
  min?: number;
  max?: number;
}
