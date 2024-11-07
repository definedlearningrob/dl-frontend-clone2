import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((prevState) => !prevState);

  return [value, toggle, setTrue, setFalse] as const;
};
