import { Textarea } from "@/components/ui/textarea";
import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import { LongTextInputProps } from "./types";

const LongText = ({
  placeholder,
  defaultValue,
  minLength,
  maxLength,
  onChange,
}: LongTextInputProps) => {
  const validate = (value: string) => !maxLength || value.length <= maxLength;

  const { value, handleChange } = useTextComponentChange({
    onChange,
    validate,
    defaultValue: defaultValue,
  });

  return (
    <Textarea
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={handleChange}
      value={value}
    />
  );
};

export default LongText;
