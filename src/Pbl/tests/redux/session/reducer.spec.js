import reducer from '@pbl/redux/session/reducer';
import { ActionTypes } from '@pbl/redux/session/types';

describe('redux | session | reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loginError: {},
      user: null,
    });
  });

  it('should handle login success', () => {
    expect(
      reducer(
        {
          loginError: {},
          user: null,
        },
        {
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            user: {
              name: 'Bruce Wayne',
            },
          },
        }
      )
    ).toEqual({
      loginError: {},
      user: {
        name: 'Bruce Wayne',
      },
    });
  });

  it('should handle login failure', () => {
    expect(
      reducer(
        {
          loginError: {},
          user: {},
        },
        {
          type: ActionTypes.LOGIN_FAILURE,
          payload: {
            loginError: {
              accountArchived: false,
              message: '',
              status: 401,
            },
          },
        }
      )
    ).toEqual({
      loginError: {
        accountArchived: false,
        message: '',
        status: 401,
      },
      user: null,
    });
  });

  it('should handle login failure when account archived', () => {
    expect(
      reducer(
        {
          loginError: {},
          user: {},
        },
        {
          type: ActionTypes.LOGIN_FAILURE,
          payload: {
            loginError: {
              accountArchived: true,
              message: 'account archived',
              status: 401,
            },
          },
        }
      )
    ).toEqual({
      loginError: {
        accountArchived: true,
        message: 'account archived',
        status: 401,
      },
      user: null,
    });
  });

  it('should handle logout', () => {
    expect(
      reducer(
        {
          loginError: {},
          user: {},
        },
        {
          type: ActionTypes.LOGOUT,
        }
      )
    ).toEqual({
      loginError: {},
      user: null,
    });
  });

  it('should handle clear login error', () => {
    expect(
      reducer(
        {
          loginError: {
            accountArchived: false,
            message: '',
            status: 401,
          },
        },
        {
          type: ActionTypes.CLEAR_LOGIN_ERROR,
        }
      )
    ).toEqual({
      loginError: {},
    });
  });
});
