import { useSingleChoiceChange } from "@/app/questionnaire/hooks/useSingleChoiceChange";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { SingleChoiceComponentProps } from "./types";

const RadioButtons = ({ defaultValue, options, onChange }: SingleChoiceComponentProps) => {
  const { value, handleValueChange } = useSingleChoiceChange({
    defaultValue,
    onChange,
  });

  return (
    <RadioGroup defaultValue={defaultValue} value={value} onValueChange={handleValueChange}>
      {options.map((option) => (
        <div className="flex items-center space-x-2" key={option.value}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioButtons;
