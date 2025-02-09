import { BaseQuestion } from "./question-types";

export enum SingleChoiceSubType {
  RADIO = "radio",
  SELECT = "select",
}

export interface SingleChoiceOptionType {
  id: string;
  label: string;
  value: string;
}

export interface SingleChoiceQuestionType extends BaseQuestion {
  sub_type: SingleChoiceSubType;
  options: SingleChoiceOptionType[];
}

// Component Types
export interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  answer: string;
  onChange: (value: string) => void;
}

export interface DSelectProps {
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
