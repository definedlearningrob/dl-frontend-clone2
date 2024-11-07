import { createContext, useContext, ReactNode } from 'react';
import { DialogProps } from '@reach/dialog';

type ContextProps = {
  onDismiss: Pick<DialogProps, 'onDismiss'>['onDismiss'];
  isWide: boolean;
};

export const ModalContext = createContext<ContextProps>({
  onDismiss: () => {},
  isWide: false,
});

type Props = {
  onDismiss: any;
  variant?: 'default' | 'wide';
  children: ReactNode;
};

export const ModalContextProvider = ({ onDismiss, variant, children }: Props) => (
  <ModalContext.Provider value={{ onDismiss, isWide: variant === 'wide' }}>
    {children}
  </ModalContext.Provider>
);

export const useModalContext = () => useContext(ModalContext);
