import { createContext, useContext, useState, type PropsWithChildren } from 'react';

import { LOCAL_STORAGE_SHARED_CONFIG } from '@shared/resources/localStorageKeys';
export type TConfig = {
  allowLogin: boolean;
  creatorId: string;
};

type TContextProps = {
  loginConfig: TConfig | null;
  shareId: string | null;
  setLoginState: (shareId: string, config: TConfig) => void;
};

const AllowLoginContext = createContext<TContextProps>({
  loginConfig: {
    allowLogin: false,
    creatorId: '',
  },
  shareId: '',
  setLoginState: () => {},
});

type TProviderProps = PropsWithChildren<{}>;

export function AllowLoginProvider({ children }: TProviderProps) {
  const localStorageConfig: TConfig = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_SHARED_CONFIG) || '{}'
  );
  const [loginConfig, setLoginConfig] = useState<TConfig>(localStorageConfig);
  const [shareId, setShareId] = useState<string | null>(null);

  const setLoginState = (shareId: string, config: TConfig) => {
    setLoginConfig(config);
    setShareId(shareId);
  };

  return (
    <AllowLoginContext.Provider value={{ loginConfig, shareId, setLoginState }}>
      {children}
    </AllowLoginContext.Provider>
  );
}

export const useAllowLogin = () => useContext(AllowLoginContext);

export default useAllowLogin;
