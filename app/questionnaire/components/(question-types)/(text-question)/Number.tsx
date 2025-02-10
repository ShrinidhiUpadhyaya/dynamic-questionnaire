import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import DBaseInput from "@/components/DBaseInput";
import { NumberInputProps } from "./types";

const Number = ({
  placeholder,
  defaultValue,
  min,
  max,
  onChange,
}: NumberInputProps) => {
  const validate = (value: string) => {
    const num = Number(value);
    return (
      !isNaN(num) &&
      (min === undefined || num >= min) &&
      (max === undefined || num <= max)
    );
  };

  const { value, handleChange } = useTextComponentChange({
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
      onChange={handleChange}
      value={value || ""}
    />
  );
};

export default Number;
