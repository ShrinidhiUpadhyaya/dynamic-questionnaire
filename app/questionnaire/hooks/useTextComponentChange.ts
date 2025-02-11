import { useDebounce } from "@/app/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

interface UseTextInputProps {
  defaultValue?: string;
  validate?: (value: string) => boolean;
  onChange?: (value: string) => void;
}

export const useTextComponentChange = ({
  onChange,
  defaultValue = "",
  validate,
}: UseTextInputProps = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

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
