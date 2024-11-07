/* eslint-disable react/prop-types */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
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

export function renderWithReduxProvider(
  ui,
  {
    initialState = {
      session: {
        loginError: {},
        user: null,
      },
    },
    store = configureMockStore([thunk])(initialState),
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}

export function renderWithRouterAndReduxProvider(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = {
      session: {
        loginError: {},
        user: {},
      },
    },
    store = configureMockStore([thunk])(initialState),
  } = {},
  ...options
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Router>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    history,
  };
}

export function renderWithI18N(ui) {
  const Wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
