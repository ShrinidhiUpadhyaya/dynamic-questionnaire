import { NumberInputProps } from "@/app/questionnaire/[id]/types/text-types";
import { useTextComponentChange } from "@/app/questionnaire/[id]/hooks/useTextComponentChange";
import DBaseInput from "@/components/DBaseInput";

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
