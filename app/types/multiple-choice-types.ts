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
