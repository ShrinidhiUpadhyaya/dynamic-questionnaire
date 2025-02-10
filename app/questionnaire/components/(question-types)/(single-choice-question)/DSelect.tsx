import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSingleChoiceChange } from "@/app/questionnaire/hooks/useSingleChoiceChange";
import { DSelectProps } from "./types";

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
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-base text-primary-foreground"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DSelect;
