import { Question } from "./question-types";

export type SingleChoiceQuestionSubType = "radio" | "select";

export type SingleChoiceOption = {
  label: string;
  value: string;
};

export type SingleChoiceQuestion = Omit<Question, "sub_type" | "options"> & {
  sub_type: SingleChoiceQuestionSubType;
  options: SingleChoiceOption[];
};
