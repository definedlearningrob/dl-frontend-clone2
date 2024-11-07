import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';

import AuthHandler from '@dc/components/AuthHandler';
import i18n from '@dc/i18n';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

const history = createMemoryHistory();
const initialState = {
  session: {},
};
const mockStore = configureMockStore([thunk]);
let store = mockStore(initialState);

jest.mock('@dc/services/session', () => ({
  authorize: jest.fn().mockImplementation(() => Promise.resolve({ token: 'sometokenhere' })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

history.replace = jest.fn();
history.push = jest.fn();

const renderAuthHandler = (store, authHistory = history) => {
  const utils = render(
    <Provider store={store}>
      <MockedProvider mocks={[]}>
        <Router history={authHistory}>
          <I18nextProvider i18n={i18n}>
            <UserInfoProvider>
              <AuthHandler />
            </UserInfoProvider>
          </I18nextProvider>
        </Router>
      </MockedProvider>
    </Provider>
  );

  return { ...utils };
};

describe('AuthHandler', () => {
  it('renders correctly', () => {
    const { container } = renderAuthHandler(store);

    expect(container).toBeInTheDocument();
  });

  it('displays loading spinner when logging', () => {
    const { getByTestId } = renderAuthHandler(store);

    expect(getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });

  it('redirects to root path when logged in', async () => {
    const loggedInState = {
      session: {},
    };

    store = mockStore(loggedInState);

    renderAuthHandler(store);

    await waitFor(() => {
      expect(history.replace).toHaveBeenCalledWith('/');
    });
  });

  it('redirects to post_auth when logged in', async () => {
    const loggedInState = {
      session: {},
    };
    const postAuthHistory = createMemoryHistory({
      initialEntries: ['/users/auth/?post_auth=/courses/805'],
    });
    const historySpy = jest.spyOn(postAuthHistory, 'replace');

    store = mockStore(loggedInState);
    renderAuthHandler(store, postAuthHistory);

    await waitFor(() => {
      expect(historySpy).toHaveBeenCalledWith('/courses/805');
    });
  });
});
