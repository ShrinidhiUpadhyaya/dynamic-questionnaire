export interface DSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export type RatingsQuestionComponentProps = DSliderProps;
