import { BaseQuestion } from "./question-types";

export enum MultipleChoiceSubType {
  CHECKBOX = "checkbox",
}

export interface MultipleChoiceOptionType {
  id: string;
  label: string;
  value: string;
}

export interface MultipleChoiceQuestionType extends BaseQuestion {
  sub_type: MultipleChoiceSubType;
  options: MultipleChoiceOptionType[];
}

// Component Types
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
