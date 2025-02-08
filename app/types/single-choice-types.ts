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
