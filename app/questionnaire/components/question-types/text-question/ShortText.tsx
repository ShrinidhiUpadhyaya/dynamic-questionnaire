import { useTextComponentChange } from "@/app/questionnaire/hooks/useTextComponentChange";
import DBaseInput from "@/components/DBaseInput";

import { ShortTextInputProps } from "./types";

const ShortText = ({
  placeholder,
  defaultValue,
  minLength,
  maxLength,
  onChange,
}: ShortTextInputProps) => {
  const validate = (value: string) => !maxLength || value.length <= maxLength;

  const { value, handleChange } = useTextComponentChange<string>({
    onChange,
    validate,
    defaultValue: defaultValue,
  });

  return (
    <DBaseInput
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={(value) => handleChange(String(value))}
      value={value || ""}
    />
  );
};

export default ShortText;
