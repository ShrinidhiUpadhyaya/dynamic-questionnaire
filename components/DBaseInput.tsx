import { Input } from "@/components/ui/input";
import { BaseInputProps } from "@/app/question/types/text-types";
import DErrorMessage from "@/components/DErrorMessage";

const DBaseInput = ({ value, error, onChange, ...props }: BaseInputProps) => {
  return (
    <div className="space-y-1">
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
      {error && <DErrorMessage error={error} />}
    </div>
  );
};

export default DBaseInput;
