import { BaseQuestion } from "./question-types";

export enum SingleChoiceSubType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
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
