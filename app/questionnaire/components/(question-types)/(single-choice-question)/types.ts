import {
  BaseQuestion,
  BaseQuestionProps,
  HandleChange,
  QuestionOption,
  QuestionType,
  UserAnswer,
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
  answer: string;
  onChange: HandleChange<UserAnswer>;
}

export interface SingleChoiceComponentProps {
  options: QuestionOption[];
  defaultValue: string;
  onChange: HandleChange<UserAnswer>;
}
