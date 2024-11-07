import PropTypes from 'prop-types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

ExpandSidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

type ExpandSidebarContextType = {
  hideHeader: boolean;
  setHideHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};
export const ExpandSidebarContext = createContext({} as ExpandSidebarContextType);

export function ExpandSidebarProvider({ children }: Props) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  return (
    <ExpandSidebarContext.Provider
      value={{
        hideHeader: isHeaderHidden,
        setHideHeader: setIsHeaderHidden,
      }}>
      {children}
    </ExpandSidebarContext.Provider>
  );
}

function useExpandSidebar() {
  return useContext(ExpandSidebarContext);
}

export default useExpandSidebar;
