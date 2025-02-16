import { MultipleChoiceQuestion } from "@/app/questionnaire/components/question-types/multiple-choice-question/types";
import { SingleChoiceQuestion } from "@/app/questionnaire/components/question-types/single-choice-question/types";
import {
  BaseValidation,
  LongTextQuestion,
  NumberQuestion,
  ShortTextQuestion,
} from "@/app/questionnaire/components/question-types/text-question/types";

export type ID = string;
export type ValidationMessage = string;

export type ComponentProps<P = {}> = React.FC<P>;
export type HandleChange<T> = (value: T) => void;

export type Operator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "lessThan";

export type LogicOperator = "and" | "or";

export interface ConditionalRule {
  questionId: ID;
  operator: Operator;
  value: UserAnswer;
  logic?: LogicOperator;
}

export const QuestionType = {
  TEXT: "text",
  SINGLE_CHOICE: "single_choice",
  MULTIPLE_CHOICE: "multiple_choice",
} as const;

export type QuestionTypeKeys = keyof typeof QuestionType;
export type QuestionTypeValues = (typeof QuestionType)[QuestionTypeKeys];

export interface BaseQuestion {
  id: ID;
  type: QuestionTypeValues;
  question: string;
  conditional?: ConditionalRule[];
}

export interface QuestionOption {
  id: ID;
  label: string;
  value: string;
}

export interface BaseQuestionProps<T> {
  question: {
    sub_type: T;
    options?: QuestionOption[];
    validation?: BaseValidation;
  };
  answer?: UserAnswer;
  onChange: HandleChange<UserAnswer>;
}

export interface BaseInputProps {
  value?: string | number;
  defaultValue?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  onChange?: HandleChange<string | number>;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  minLength?: number;
  validation?: BaseValidation;
}

export type ComponentRegistry<T extends string> = {
  [K in T]: React.FC<any>;
};

export type Question =
  | NumberQuestion
  | ShortTextQuestion
  | LongTextQuestion
  | SingleChoiceQuestion
  | MultipleChoiceQuestion;

export interface Questionnaire {
  id: ID;
  title: string;
  questions: Question[];
}

export interface Answer {
  id: ID;
  answer: UserAnswer;
}

export type UserAnswer = string | string[] | number | null;

export interface CustomError extends Error {
  status?: number;
}
