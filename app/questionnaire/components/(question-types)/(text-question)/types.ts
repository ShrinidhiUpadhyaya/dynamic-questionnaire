import {
  NumberQuestion,
  ShortTextQuestion,
  LongTextQuestion,
} from "@/types/question";

export type TextQuestion =
  | NumberQuestion
  | ShortTextQuestion
  | LongTextQuestion;

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

export type TextQuestionComponentProps =
  | ShortTextInputProps
  | LongTextInputProps
  | NumberInputProps;
