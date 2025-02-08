import { useState, useCallback } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

interface UseTextInputProps {
  onChange?: (value: string) => void;
  initialValue?: string;
  validate?: (value: string) => boolean;
}

export const useTextComponentChange = ({
  onChange,
  initialValue = "",
  validate,
}: UseTextInputProps = {}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const { debouncedSave } = useDebounce({
    onSave: useCallback(
      async (newValue: string) => {
        if (validate && !validate(newValue)) {
          setError(true);
          return;
        }
        setError(false);
        onChange?.(newValue);
      },
      [onChange, validate]
    ),
  });

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSave(newValue);
    },
    [debouncedSave]
  );

  return {
    value,
    error,
    handleChange,
    setValue,
  };
};
