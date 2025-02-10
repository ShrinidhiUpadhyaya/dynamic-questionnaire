import { Textarea } from "@/components/ui/textarea";
import { LongTextInputProps } from "@/app/questionnaire/[id]/types/text-types";
import { useTextComponentChange } from "@/app/questionnaire/[id]/hooks/useTextComponentChange";

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
