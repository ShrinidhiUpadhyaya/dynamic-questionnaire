import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import { Textarea } from "@/components/ui/textarea";

import { LongTextInputProps } from "./types";

const LongText = ({
  placeholder,
  defaultValue,
  minLength,
  maxLength,
  onChange,
}: LongTextInputProps) => {
  const validate = (value: string) => !maxLength || value.length <= maxLength;

  const { value, handleChange } = useTextComponentChange<string>({
    onChange,
    validate,
    defaultValue,
  });

  return (
    <Textarea
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={(e) => handleChange(e.target.value)}
      value={value}
    />
  );
};

export default LongText;
