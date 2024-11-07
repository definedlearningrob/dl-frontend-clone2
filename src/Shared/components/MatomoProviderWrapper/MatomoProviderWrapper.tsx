import { ReactElement } from 'react';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';

type MatomoInstanceConfig = {
  urlBase: string;
  siteId: number;
  linkTracking: boolean;
};

type Props = {
  children: ReactElement;
  matomoInstanceConfig: MatomoInstanceConfig;
};

export const MatomoProviderWrapper = ({ children, matomoInstanceConfig }: Props) => {
  if (import.meta.env.VITE_MATOMO_TRACK_ON === 'true') {
    const matomoInstance = createInstance(matomoInstanceConfig);

    return <MatomoProvider value={matomoInstance}>{children}</MatomoProvider>;
  }

  return children;
};
