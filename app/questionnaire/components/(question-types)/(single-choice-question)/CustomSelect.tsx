import { useSingleChoiceChange } from "@/app/questionnaire/hooks/useSingleChoiceChange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CustomSelectProps } from "./types";

const CustomSelect = ({ defaultValue, options, onChange }: CustomSelectProps) => {
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
            className="text-base text-primary-foreground">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
