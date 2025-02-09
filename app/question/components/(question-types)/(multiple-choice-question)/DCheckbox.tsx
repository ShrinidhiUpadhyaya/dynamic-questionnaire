import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MultipleChoiceOptionType } from "@/app/types/question-types";
interface DCheckboxProps {
  options: MultipleChoiceOptionType[];
  onChange: (value: boolean) => void;
}

const DCheckbox = ({ options, onChange }: DCheckboxProps) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div className="flex items-center gap-2" key={option.value}>
          <Checkbox id={option.value} onCheckedChange={onChange} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default DCheckbox;
