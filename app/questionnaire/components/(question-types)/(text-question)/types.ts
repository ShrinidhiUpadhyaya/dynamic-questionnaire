import { LongTextQuestion, NumberQuestion, ShortTextQuestion } from "@/types/question";

export type TextQuestion = NumberQuestion | ShortTextQuestion | LongTextQuestion;

export interface TextQuestionProps {
  question: TextQuestion;
  answer: string;
  onChange: (value: string) => void;
}

export interface BaseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "disabled" | "error" | "type" | "placeholder"
  > {
  value?: string | number;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  onChange?: (value: string | number) => void;
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
