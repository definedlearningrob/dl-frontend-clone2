import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useToggle } from 'react-use';

import { useBreakpointDown } from '@shared/hooks/useBreakpointDown';

type BackNavButtonConfig = {
  show: boolean;
  destination?: string | null;
  text?: string | null;
  callback?: () => void | null;
};

type NavigationContextType = {
  isExpanded: boolean;
  toggleIsExpanded: (nextValue?: boolean) => void;
  isHidden: boolean;
  toggleIsHidden: (nextValue?: boolean) => void;
  backNavButton: BackNavButtonConfig;
  setBackNavButton: React.Dispatch<React.SetStateAction<BackNavButtonConfig>>;
};

export const NavigationContext = createContext({} as NavigationContextType);

type Props = {
  children: ReactNode;
};

export const NavigationContextProvider = ({ children }: Props) => {
  const isUnder1200p = useBreakpointDown({ breakpoint: 'xl' });

  const [isExpanded, toggleIsExpanded] = useToggle(!isUnder1200p);
  const [isHidden, toggleIsHidden] = useToggle(false);

  useEffect(() => {
    toggleIsExpanded(!isUnder1200p);
  }, [isUnder1200p]);

  const [backNavButton, setBackNavButton] = useState<BackNavButtonConfig>({
    show: false,
    destination: null,
    text: null,
    callback: () => {},
  });

  return (
    <NavigationContext.Provider
      value={{
        isExpanded,
        toggleIsExpanded,
        isHidden,
        toggleIsHidden,
        backNavButton,
        setBackNavButton,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const { setBackNavButton, ...rest } = useContext(NavigationContext);

  const setupBackButton = (
    booleanValue: boolean,
    destination?: string | null,
    text?: string | null,
    callback?: () => void | null
  ) => {
    setBackNavButton({
      show: booleanValue,
      destination,
      text,
      callback,
    });
  };

  return { setBackNavButton: setupBackButton, ...rest };
};
