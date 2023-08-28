import { useEffect, useState } from "react";

export const useDebounce = (value: string | null, delay?: number) => {
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebValue(value), delay || 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debValue;
};
