import { ActionTypes } from '@dc/redux/session/types';
import {
  login,
  logout,
  authorize,
  startImpersonate,
  stopImpersonate,
  loginSharedSession,
} from '@dc/services/session';

import { callToast } from '@shared/components/Toaster/Toaster';

type UserType = 'user' | 'student';
type TArchivedUser = { status: string };
type TAuthenticatedUser = {
  username: string;
  type: UserType;
};

type TProvider = 'google' | 'clever' | 'classLink';

const isArchived = (text: string) => /(\baccount is currently archived)/i.test(text);

export const loginAction =
  (data: {
    provider: TProvider | null;
    password: string;
    login: string;
    domain?: string;
    type: UserType;
  }) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | TArchivedUser | void> => {
    try {
      const user = await login(data);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      // @ts-ignore
      const accountArchived = /(\baccount is currently archived)/i.test(error.message);
      // @ts-ignore
      const loginError = { ...error, accountArchived };

      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: { loginError },
      });
    }
  };

export const loginSharedSessionAction =
  (token: string) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | TArchivedUser | void> => {
    try {
      const user = await loginSharedSession(token);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      // @ts-ignore
      callToast('error', typeof error !== 'string' ? error.message : error);

      // @ts-ignore
      const accountArchived = isArchived(error.message);
      // @ts-ignore
      const loginError = { ...error, accountArchived };

      dispatch({ type: ActionTypes.LOGIN_FAILURE, payload: { loginError } });
    }
  };

export const impersonateAction =
  (type: 'start' | 'stop', userType?: 'User' | 'Student', studentUuid?: string) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | TArchivedUser | void> => {
    try {
      const user = await (type === 'start' && userType && studentUuid
        ? startImpersonate(userType, studentUuid)
        : stopImpersonate());
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE });
    }
  };

export const authorizeAction =
  (code: string, type: UserType) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | TArchivedUser | void> => {
    try {
      const user = await authorize(code, type);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      // @ts-ignore
      callToast('error', typeof error !== 'string' ? error.message : error);

      // @ts-ignore
      const accountArchived = isArchived(error.message);
      // @ts-ignore
      const loginError = { ...error, accountArchived };

      dispatch({ type: ActionTypes.LOGIN_FAILURE, payload: { loginError } });
    }
  };

export const logoutAction = (): { type: ActionTypes.LOGOUT } => {
  logout();

  return { type: ActionTypes.LOGOUT };
};

export const clearLoginError = (): { type: ActionTypes.CLEAR_LOGIN_ERROR } => ({
  type: ActionTypes.CLEAR_LOGIN_ERROR,
});
