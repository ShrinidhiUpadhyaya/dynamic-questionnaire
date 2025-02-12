import { BaseInputProps } from "@/app/questionnaire/components/(question-types)/(text-question)/types";
import DErrorMessage from "@/components/DErrorMessage";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

const DBaseInput = ({
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  step,
  maxLength,
  minLength,
  disabled,
  ...props
}: BaseInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="space-y-1">
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        minLength={minLength}
        onChange={handleChange}
        disabled={disabled}
        className={`${error && "border-red-500 focus-visible:ring-red-500"} `}
        {...props}
      />
      {error && <DErrorMessage error={error} />}
    </div>
  );
};

export default DBaseInput;
