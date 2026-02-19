import { useState, useEffect } from "react";

/**
 * A custom hook that returns a debounced version of the provided value.
 * The value will only be updated after the specified delay has passed
 * without any further changes to the value.
 *
 * @param value The value to be debounced
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes (or the component unmounts)
    // This prevents the debounced value from updating if the value is changing rapidly
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
