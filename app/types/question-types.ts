export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  sub_type?: string;
  options?: string[];
  validation?: Validation;
};

export type QuestionType = "text" | "single_choice" | "multiple_choice";

export type TextQuestionSubType = "shortText" | "longText" | "number";

export type Validation = {
  minLength?: number;
  maxLength?: number;
  regex?: string;
  message?: string;
  custom?: string;
};
