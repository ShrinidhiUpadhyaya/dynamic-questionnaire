import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UseDebounceProps<T> {
  onSave: (value: T) => Promise<void>;
  delay?: number;
}

export const useDebounce = <T>({ onSave, delay = 300 }: UseDebounceProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSave = useDebouncedCallback(async (value: T) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSave(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsLoading(false);
    }
  }, delay);

  return {
    isLoading,
    error,
    debouncedSave,
  };
};
