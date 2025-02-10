import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DCheckboxProps } from "@/app/questionnaire/[id]/types/multiple-choice-types";
import { useState } from "react";

const DCheckbox = ({ options, defaultValues, onChange }: DCheckboxProps) => {
  const [values, setValues] = useState<string[]>(defaultValues);

  const handleValueChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...values, value]
      : values.filter((v) => v !== value);
    setValues(newValues);
    onChange(newValues);
  };

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
