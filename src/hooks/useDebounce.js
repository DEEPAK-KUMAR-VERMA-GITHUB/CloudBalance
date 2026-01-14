import { useMemo, useState } from "react";

export const useDebounce = (value, delay = 50) => {
  const [debounced, setDebounced] = useState(value);

  useMemo(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
