export interface Answer {
  questionId: string;
  answer: string | string[];
}

export type UserAnswer = {
  value: string | number | null;
};
