import {
  MultipleChoiceOptionType,
  MultipleChoiceQuestionType,
} from "@/types/question";

export interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  answer: string[];
  onChange: (value: string[]) => void;
}

export interface DCheckboxProps {
  defaultValue: string[];
  options: MultipleChoiceOptionType[];
  onChange: (value: string[]) => void;
}

export interface ToggleButtonProps {
  defaultValue: string[];
  options: MultipleChoiceOptionType[];
  onChange: (value: string[]) => void;
}

export type MultipleChoiceQuestionComponentProps = DCheckboxProps;
