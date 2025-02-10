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
  defaultValues: string[];
  options: MultipleChoiceOptionType[];
  onChange: (value: string[]) => void;
}

export type MultipleChoiceQuestionComponentProps = DCheckboxProps;
