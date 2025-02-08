import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SingleChoiceOption } from "@/app/types/single-choice-types";
import { useSingleChoiceChange } from "@/app/question/hooks/useSingleChoiceChange";

interface RadioButtonsProps {
  defaultValue: string;
  options: SingleChoiceOption[];
  onChange: (value: string) => void;
}

const RadioButtons = ({
  defaultValue,
  options,
  onChange,
}: RadioButtonsProps) => {
  const { value, handleValueChange } = useSingleChoiceChange({
    defaultValue,
    onChange,
  });

  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
    >
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
