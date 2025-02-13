import { useDebounce } from "@/app/hooks/useDebounce";
import { useEffect, useState } from "react";

interface UseMultipleChoiceChangeProps {
  defaultValue: string[];
  onChange: (newValues: string[]) => void;
}

export const useMultipleChoiceChange = ({
  defaultValue = [],
  onChange,
}: UseMultipleChoiceChangeProps) => {
  const [values, setValues] = useState<string[]>(defaultValue);

  useEffect(() => {
    if (defaultValue !== undefined && JSON.stringify(defaultValue) !== JSON.stringify(values)) {
      setValues(defaultValue);
    }
  }, [defaultValue]);

  const { debouncedSave } = useDebounce({
    onSave: async (newValues: string[]) => {
      if (onChange) {
        await onChange(newValues);
      }
    },
  });

  const handleValueChange = (value: string, checked: boolean) => {
    const newValues = checked ? [...values, value] : values.filter((v) => v !== value);
    setValues(newValues);
    debouncedSave(newValues);
  };

  return {
    values,
    handleValueChange,
  };
};
