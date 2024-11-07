import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

import i18nDC from '@dc/i18n';

import i18nDL from '@pbl/i18n';

export function renderWithI18N(ui: ReactElement, service: 'DC' | 'DL') {
  const i18n = service === 'DC' ? i18nDC : i18nDL;
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
