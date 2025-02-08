import { Input } from "@/components/ui/input";
import { NumberInputProps } from "@/app/types/text-types";
import { useTextComponentChange } from "@/app/question/hooks/useTextComponentChange";

const Number = ({ placeholder, min, max, onChange }: NumberInputProps) => {
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
  });

  return (
    <Input
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
