import { useDebounce } from "@/app/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

interface UseTextInputProps<T> {
  defaultValue?: string | number;
  validate?: (value: T) => boolean;
  onChange?: (newValue: T) => void;
}

export const useTextComponentChange = <T extends string | number>({
  onChange,
  defaultValue = "" as T,
  validate,
}: UseTextInputProps<T> = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (defaultValue && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const { debouncedSave } = useDebounce({
    onSave: useCallback(
      async (newValue: T) => {
        if (validate && !validate(newValue)) {
          setError(true);
          return;
        }
        setError(false);
        onChange?.(newValue);
      },
      [onChange, validate],
    ),
  });

  const handleChange = useCallback(
    (newValue: T) => {
      setValue(newValue);
      debouncedSave(newValue);
    },
    [debouncedSave],
  );

  return {
    value,
    error,
    handleChange,
  };
};
