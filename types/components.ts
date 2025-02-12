import { QuestionOptionsType } from "./question";

export type ComponentRegistry<T extends string> = {
  [K in T]: React.FC<any>;
};

export type BaseQuestionProps<T> = {
  question: {
    sub_type: T;
    options?: QuestionOptionsType[];
  };
  answer?: string | string[];
  onChange: (value: any) => void;
};
