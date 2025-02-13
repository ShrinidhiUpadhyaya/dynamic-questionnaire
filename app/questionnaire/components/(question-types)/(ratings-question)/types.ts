import {
  BaseQuestion,
  BaseQuestionProps,
  HandleChange,
  QuestionOption,
  QuestionType,
  UserAnswer,
} from "@/types/common";

export const RatingsSubType = {
  SLIDER: "slider",
} as const;

export type RatingsSubTypeKeys = keyof typeof RatingsSubType;
export type RatingsSubTypeValues = (typeof RatingsSubType)[RatingsSubTypeKeys];

export interface RatingsQuestion extends BaseQuestion {
  type: typeof QuestionType.RATINGS;
  sub_type: RatingsSubTypeValues;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export interface RatingsQuestionProps extends BaseQuestionProps<RatingsQuestion> {
  answer: number;
  onChange: HandleChange<UserAnswer>;
}

export interface CustomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export type RatingsQuestionComponentProps = CustomSliderProps;
