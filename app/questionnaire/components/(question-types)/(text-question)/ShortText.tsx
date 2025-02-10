import { Input } from "@/components/ui/input";
import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import { ShortTextInputProps } from "./types";

const ShortText = ({
  placeholder,
  defaultValue,
  minLength,
  maxLength,
  onChange,
}: ShortTextInputProps) => {
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
