import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import DBaseInput from "@/components/DBaseInput";

import { NumberTextInputProps } from "./types";

const NumberText = ({ placeholder, defaultValue, min, max, onChange }: NumberTextInputProps) => {
  const validate = (validateValue: number) => {
    const num = Number(validateValue);
    return !isNaN(num) && (min === undefined || num >= min) && (max === undefined || num <= max);
  };

  const { value, handleChange } = useTextComponentChange<number>({
    onChange,
    validate,
    defaultValue: defaultValue,
  });

  return (
    <DBaseInput
      type="number"
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={(value) => handleChange(Number(value))}
      value={value}
    />
  );
};

export default NumberText;
