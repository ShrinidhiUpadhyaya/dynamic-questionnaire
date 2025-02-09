import { Input } from "@/components/ui/input";
import { BaseInputProps } from "@/app/types/text-types";
import { useTextComponentChange } from "@/app/question/hooks/useTextComponentChange";

const ShortText = ({
  placeholder,
  minLength,
  maxLength,
  onChange,
  defaultValue,
}: BaseInputProps) => {
  const validate = (value: string) => !maxLength || value.length <= maxLength;

  const { value, handleChange } = useTextComponentChange({
    onChange,
    validate,
    defaultValue: defaultValue,
  });

  return (
    <Input
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={handleChange}
      value={value}
    />
  );
};

export default ShortText;
