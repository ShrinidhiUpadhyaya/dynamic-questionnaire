import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import DBaseInput from "@/components/DBaseInput";

import { NumberTextInputProps } from "./types";

const NumberText = ({
  placeholder,
  defaultValue,
  min,
  max,
  validation,
  onChange,
}: NumberTextInputProps) => {
  const validate = (validateValue: number) => {
    const num = Number(validateValue);

    if (isNaN(num) || (min !== undefined && num < min) || (max !== undefined && num > max)) {
      return false;
    }

    if (validation?.pattern) {
      const regex = new RegExp(validation.pattern);
      return regex.test(validateValue.toString());
    }

    return true;
  };

  const { value, handleChange, error } = useTextComponentChange<number>({
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
      onChange={(value) => handleChange(value as number)}
      value={value || ""}
      error={error ? validation?.message : ""}
    />
  );
};

export default NumberText;
