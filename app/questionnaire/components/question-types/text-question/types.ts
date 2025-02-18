import {
  BaseInputProps,
  BaseQuestion,
  BaseQuestionProps,
  HandleChange,
  QuestionType,
  UserResponse,
  ValidationMessage,
} from "@/types/common";

export const TextSubType = {
  NUMBER: "number_text",
  SHORT: "short_text",
  LONG: "long_text",
} as const;

export interface NumberValidation {
  min?: number;
  max?: number;
  message?: ValidationMessage;
}

export interface BaseValidation {
  message?: ValidationMessage;
  pattern?: RegExp | string;
}

export interface TextValidation extends BaseValidation {
  minLength?: number;
  maxLength?: number;
}

export type TextSubTypeKeys = keyof typeof TextSubType;
export type TextSubTypeValues = (typeof TextSubType)[TextSubTypeKeys];

export interface TextQuestionBase extends BaseQuestion {
  type: typeof QuestionType.TEXT;
  sub_type: TextSubTypeValues;
}

export interface NumberQuestion extends TextQuestionBase {
  sub_type: typeof TextSubType.NUMBER;
  validation?: NumberValidation;
}

export interface ShortTextQuestion extends TextQuestionBase {
  sub_type: typeof TextSubType.SHORT;
  validation?: TextValidation;
}

export interface LongTextQuestion extends TextQuestionBase {
  sub_type: typeof TextSubType.LONG;
  validation?: TextValidation;
}

export interface TextQuestionProps extends BaseQuestionProps<TextQuestionBase> {
  response: string;
  onChange: HandleChange<UserResponse>;
}

export interface LongTextInputProps extends BaseInputProps {
  minLength?: number;
  maxLength?: number;
}

export interface ShortTextInputProps extends BaseInputProps {
  minLength?: number;
  maxLength?: number;
}

export interface NumberTextInputProps extends BaseInputProps {
  min?: number;
  max?: number;
}
