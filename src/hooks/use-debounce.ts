import { useState, useEffect } from "react";

const useDebounce = <T>(
  initialValue: T | null = null,
  delay: number = 300
): [T | null, (value: T | null) => void] => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(initialValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [initialValue, delay]);

  return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
