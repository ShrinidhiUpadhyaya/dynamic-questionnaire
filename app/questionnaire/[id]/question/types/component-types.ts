export type ComponentRegistry<T extends string> = {
  [K in T]: React.FC<any>;
};

export type BaseQuestionProps<T> = {
  question: {
    sub_type: T;
    options?: Array<{ id: string; label: string; value: any }>;
  };
  answer?: any;
  onChange: (value: any) => void;
};
