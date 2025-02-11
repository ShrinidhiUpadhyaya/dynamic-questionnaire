import { Toggle } from "@/components/ui/toggle";
import { useMultipleChoiceChange } from "@/app/questionnaire/hooks/useMultipleChoiceChange";
import { ToggleButtonProps } from "./types";

const ToggleButton = ({
  options,
  defaultValue = [],
  onChange,
}: ToggleButtonProps) => {
  const { values, handleValueChange } = useMultipleChoiceChange({
    defaultValue: defaultValue,
    onChange: onChange,
  });

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <Toggle
          key={option.value}
          aria-label={option.label}
          pressed={values.includes(option.value)}
          onPressedChange={(pressed) =>
            handleValueChange(option.value, pressed)
          }
        >
          {option.label}
        </Toggle>
      ))}
    </div>
  );
};

export default ToggleButton;
