import {
  BaseQuestion,
  BaseQuestionProps,
  HandleChange,
  QuestionOption,
  QuestionType,
  UserAnswer,
} from "@/types/common";

export const MultipleChoiceSubType = {
  CHECKBOX: "checkbox",
} as const;

export type MultipleChoiceSubTypeKeys = keyof typeof MultipleChoiceSubType;
export type MultipleChoiceSubTypeValues = (typeof MultipleChoiceSubType)[MultipleChoiceSubTypeKeys];

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: typeof QuestionType.MULTIPLE_CHOICE;
  sub_type: MultipleChoiceSubTypeValues;
  options: QuestionOption[];
}
export interface MultipleChoiceQuestionProps extends BaseQuestionProps<MultipleChoiceQuestion> {
  answer: string[];
  onChange: HandleChange<UserAnswer>;
}

export interface MultipleChoiceComponentProps {
  options: QuestionOption[];
  defaultValue: string[];
  onChange: HandleChange<UserAnswer>;
}
