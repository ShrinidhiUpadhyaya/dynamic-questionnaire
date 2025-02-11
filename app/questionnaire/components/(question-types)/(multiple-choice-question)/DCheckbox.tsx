import { useMultipleChoiceChange } from "@/app/questionnaire/hooks/useMultipleChoiceChange";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DCheckboxProps } from "./types";

const DCheckbox = ({
  options,
  defaultValue = [],
  onChange,
}: DCheckboxProps) => {
  const { values, handleValueChange } = useMultipleChoiceChange({
    defaultValue,
    onChange,
  });

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div className="flex items-center gap-2" key={option.value}>
          <Checkbox
            id={option.value}
            checked={values?.includes(option.value)}
            onCheckedChange={(checked) =>
              handleValueChange(option.value, Boolean(checked))
            }
          />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default DCheckbox;
