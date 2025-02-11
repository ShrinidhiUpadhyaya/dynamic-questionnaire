import {
  SingleChoiceOptionType,
  SingleChoiceQuestionType,
} from "@/types/question";

export interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  answer: string;
  onChange: (value: string) => void;
}

export interface CustomSelectProps {
  defaultValue: string;
  answer: string;
  options: SingleChoiceOptionType[];
  onChange: (value: string) => void;
}

export interface RadioButtonsProps {
  defaultValue: string;
  options: SingleChoiceOptionType[];
  onChange: (value: string) => void;
}

export type SingleChoiceQuestionComponentProps =
  | CustomSelectProps
  | RadioButtonsProps;
