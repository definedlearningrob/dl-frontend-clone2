import { createContext, useContext, type ReactNode } from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  ltiDetails: LtiDetails;
};

type LtiDetails = {
  isLti: boolean;
  isLtiSearch: boolean;
  ltiResourceLinkId: string;
  ltiContextId: string;
};

const LtiProviderContext = createContext<{
  isLti: boolean;
  isLtiSearch: boolean;
  ltiResourceLinkId: string;
  contextId: string;
  children: ReactNode | ReactNode[];
}>({
  isLti: false,
  isLtiSearch: false,
  ltiResourceLinkId: '',
  contextId: '',
  children: null,
});

export function LtiProvider({ ltiDetails, children }: Props) {
  return (
    <LtiProviderContext.Provider
      value={{
        isLti: ltiDetails.isLti,
        isLtiSearch: ltiDetails.isLtiSearch,
        ltiResourceLinkId: ltiDetails.ltiResourceLinkId,
        contextId: ltiDetails.ltiContextId,
        children,
      }}>
      {children}
    </LtiProviderContext.Provider>
  );
}

export function useLti() {
  return useContext(LtiProviderContext);
}
