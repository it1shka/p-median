import { useEffect, useState } from "react";

export const sortedBy = <T>(f: (e: T) => number, array: T[]) =>
  [...array].sort((a, b) => f(a) - f(b));

export const minBy = <T>(f: (e: T) => number, array: T[]) => {
  if (array.length <= 0) return null;
  let minElement = array[0];
  let minValue = f(minElement);
  for (let i = 1; i < array.length; i++) {
    const currentValue = f(array[i]);
    if (currentValue < minValue) {
      minValue = currentValue;
      minElement = array[i];
    }
  }
  return minElement;
};

export const useAsync = <T>(expensiveComputation: () => T) => {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    (async () => {
      const output = expensiveComputation();
      setValue(output);
    })();
  }, []);
  return value;
};

// TODO: implement function memoization
export const cached = <F extends Function>(fn: F) => {
  // TODO: 
}
