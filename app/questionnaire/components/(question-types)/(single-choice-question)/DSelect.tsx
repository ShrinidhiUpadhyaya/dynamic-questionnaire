import { useSingleChoiceChange } from "@/app/questionnaire/hooks/useSingleChoiceChange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DSelectProps } from "./types";
const DSelect = ({ defaultValue, options, onChange }: DSelectProps) => {
  const { value, handleValueChange } = useSingleChoiceChange({
    defaultValue,
    onChange,
  });

  const selectedValue = Array.isArray(value) ? value[0] : value;

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
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
