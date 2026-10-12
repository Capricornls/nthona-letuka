import { useState, useEffect } from "react";

// Works like useState, but the value is also saved in local storage.
// 1. The first time, we read the saved value (or use the starting value).
// 2. Every time the value changes, useEffect saves it again.
function useLocalStorage(key, startingValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) {
      return startingValue;
    }
    try {
      return JSON.parse(saved);
    } catch (error) {
      return startingValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
