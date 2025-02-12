import { MultipleChoiceQuestionType, QuestionOptionsType } from "@/types/question";

export interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  answer: string[];
  onChange: (value: string[]) => void;
}

export interface CheckboxListProps {
  defaultValue: string[];
  options: QuestionOptionsType[];
  onChange: (value: string[]) => void;
}

export type MultipleChoiceQuestionComponentProps = CheckboxListProps;
