import {
  BaseQuestion,
  BaseQuestionProps,
  HandleChange,
  QuestionOption,
  QuestionType,
  UserResponse,
} from "@/types/common";

export const SingleChoiceSubType = {
  RADIO: "radio",
  SELECT: "select",
} as const;

export type SingleChoiceSubTypeKeys = keyof typeof SingleChoiceSubType;
export type SingleChoiceSubTypeValues = (typeof SingleChoiceSubType)[SingleChoiceSubTypeKeys];

export interface SingleChoiceQuestion extends BaseQuestion {
  type: typeof QuestionType.SINGLE_CHOICE;
  sub_type: SingleChoiceSubTypeValues;
  options: QuestionOption[];
}

export interface SingleChoiceQuestionProps extends BaseQuestionProps<SingleChoiceQuestion> {
  response: string;
  onChange: HandleChange<UserResponse>;
}

export interface SingleChoiceComponentProps {
  options: QuestionOption[];
  defaultValue: string;
  onChange: HandleChange<UserResponse>;
}
