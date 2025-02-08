import { Input } from "@/components/ui/input";
import { BaseInputProps } from "@/app/types/text-types";

const BaseInput = ({ value, onChange, error, ...props }: BaseInputProps) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  );
};

export default BaseInput;
