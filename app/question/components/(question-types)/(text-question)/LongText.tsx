import { Textarea } from "@/components/ui/textarea";
import { BaseInputProps } from "@/app/types/text-types";
import { useTextComponentChange } from "@/app/question/hooks/useTextComponentChange";

const LongText = ({
  placeholder,
  minLength,
  maxLength,
  onChange,
}: BaseInputProps) => {
  const validate = (value: string) => !maxLength || value.length <= maxLength;

  const { value, handleChange } = useTextComponentChange({
    onChange,
    validate,
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
