import { Input } from "@/components/ui/input";
import { BaseInputProps } from "@/app/question/types/text-types";

const DBaseInput = ({ value, onChange, error, ...props }: BaseInputProps) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  );
};

export default DBaseInput;
