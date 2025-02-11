import {
  MultipleChoiceOptionType,
  MultipleChoiceQuestionType,
} from "@/types/question";

export interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  answer: string[];
  onChange: (value: string[]) => void;
}

export interface CheckboxListProps {
  defaultValue: string[];
  options: MultipleChoiceOptionType[];
  onChange: (value: string[]) => void;
}

export type MultipleChoiceQuestionComponentProps = CheckboxListProps;
