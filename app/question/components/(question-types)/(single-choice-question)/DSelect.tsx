import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleChoiceOption } from "@/app/types/single-choice-types";
import { useSingleChoiceChange } from "@/app/question/hooks/useSingleChoiceChange";

interface DSelectProps {
  defaultValue: string;
  options: SingleChoiceOption[];
  onChange: (value: string) => void;
}

const DSelect = ({ defaultValue, options, onChange }: DSelectProps) => {
  const { value, handleValueChange } = useSingleChoiceChange({
    defaultValue,
    onChange,
  });

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DSelect;
