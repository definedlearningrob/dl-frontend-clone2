/* eslint-disable react/prop-types */
import { createMemoryHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import i18n from '@dc/i18n';

export function renderWithRouter(
  ui,
  { route = '/', routePath = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>
      <I18nextProvider i18n={i18n}>
        <Route path={routePath} render={() => children} />
      </I18nextProvider>
    </Router>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
