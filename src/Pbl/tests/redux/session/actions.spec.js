import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '@pbl/redux/session/actions';
import { ActionTypes } from '@pbl/redux/session/types';
import { authorize, login, logout } from '@pbl/services/session';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('@pbl/services/session');

afterEach(() => {
  jest.clearAllMocks();
});

describe('redux | session | actions', () => {
  it('creates LOGIN_SUCCESS when authorize has been done', () => {
    authorize.mockImplementation(() => Promise.resolve({ token: 'sometokenhere' }));

    const expectedActions = [
      {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          user: {
            token: 'sometokenhere',
          },
        },
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.authorizeAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('LOGIN_SUCCESS when login has been done', () => {
    login.mockImplementation(() => Promise.resolve({ token: 'sometokenhere' }));

    const expectedActions = [
      {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          user: {
            token: 'sometokenhere',
          },
        },
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.loginAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('LOGIN_FAILURE on authorize error', () => {
    authorize.mockImplementation(() => {
      throw { message: 'somerror', status: 401 };
    });

    const expectedActions = [
      {
        type: ActionTypes.LOGIN_FAILURE,
        payload: {
          loginError: {
            accountArchived: false,
            message: 'somerror',
            status: 401,
          },
        },
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.authorizeAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGIN_FAILURE on login error', () => {
    login.mockImplementation(() => {
      throw { message: 'someerror', status: 401 };
    });

    const expectedActions = [
      {
        type: ActionTypes.LOGIN_FAILURE,
        payload: {
          loginError: {
            accountArchived: false,
            message: 'someerror',
            status: 401,
          },
        },
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.loginAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGIN_FAILURE on login error when account archived', () => {
    login.mockImplementation(() => {
      throw { message: 'account is currently archived', status: 401 };
    });

    const expectedActions = [
      {
        type: ActionTypes.LOGIN_FAILURE,
        payload: {
          loginError: {
            accountArchived: true,
            message: 'account is currently archived',
            status: 401,
          },
        },
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.loginAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGOUT action on logout', () => {
    logout.mockImplementation(() => {});

    const expectedActions = [{ type: ActionTypes.LOGOUT }];
    const store = mockStore({});

    store.dispatch(actions.logoutAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('calls session service login function with correct parameters', () => {
    const params = { username: 'someusername', password: 'password', type: 'user' };
    const store = mockStore({});

    store.dispatch(actions.loginAction(params));

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(params);
  });

  it('calls session service authorize function with correct parameters', () => {
    const params = ['somecode', 'users'];
    const store = mockStore({});

    store.dispatch(actions.authorizeAction(...params));

    expect(authorize).toHaveBeenCalledTimes(1);
    expect(authorize).toHaveBeenCalledWith(...params);
  });
});
