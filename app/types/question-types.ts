export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
};

export type QuestionType =
  | "text"
  | "single_choice"
  | "multiple_choice"
  | "date_time"
  | "ratings";
