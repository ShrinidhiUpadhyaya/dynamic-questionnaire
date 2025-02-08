import { useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

interface UseSingleChoiceChangeProps {
  defaultValue: string;
  onChange: (newValue: string) => void;
}

export const useSingleChoiceChange = ({
  defaultValue,
  onChange,
}: UseSingleChoiceChangeProps) => {
  const [value, setValue] = useState(defaultValue);

  const { debouncedSave } = useDebounce({
    onSave: async (newValue: string) => {
      if (onChange) {
        await onChange(newValue);
      }
    },
  });

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    debouncedSave(newValue);
  };

  return {
    value,
    handleValueChange,
  };
};
