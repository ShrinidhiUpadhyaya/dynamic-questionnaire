import { Input } from "@/components/ui/input";
import { NumberInputProps } from "@/app/question/types/text-types";
import { useTextComponentChange } from "@/app/question/hooks/useTextComponentChange";

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
