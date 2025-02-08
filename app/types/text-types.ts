export interface BaseInputProps {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
}

export interface NumberInputProps
  extends Omit<BaseInputProps, "minLength" | "maxLength"> {
  min?: number;
  max?: number;
}
