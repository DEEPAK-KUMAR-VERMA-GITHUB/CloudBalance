import { useMemo, useState } from "react";

const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useMemo(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
