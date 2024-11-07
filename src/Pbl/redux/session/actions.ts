import { loginSharedSession, startImpersonate, stopImpersonate } from '@pbl/services/session';
import { ActionTypes } from '@pbl/redux/session/types';
import { login, logout, authorize } from '@pbl/services/session';

import { callToast } from '@shared/components/Toaster/Toaster';

type TUserType = 'user' | 'student';
type TArchivedUser = { status: string };
type TAuthenticatedUser = {
  username: string;
  type: TUserType;
};

type TProvider = 'google' | 'clever' | 'classLink';

const isArchived = (text: string) => /(\baccount is currently archived)/i.test(text);

export const loginAction =
  (data: {
    provider: TProvider | null;
    password: string;
    login: string;
    domain?: string;
    type: 'user' | 'student';
  }) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | void> => {
    try {
      const user = await login(data);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      // @ts-ignore
      const accountArchived = /(\baccount is currently archived)/i.test(error.message);
      // @ts-ignore
      const loginError = { ...error, accountArchived };

      dispatch({ type: ActionTypes.LOGIN_FAILURE, payload: { loginError } });
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
  (type: 'start' | 'stop', studentUuid?: string) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | TArchivedUser | void> => {
    try {
      const user = await (type === 'start' && studentUuid
        ? startImpersonate(studentUuid)
        : stopImpersonate());
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      dispatch({ type: ActionTypes.LOGIN_FAILURE });
    }
  };

export const authorizeAction =
  (code: string, type: TUserType) =>
  async (dispatch: Function): Promise<TAuthenticatedUser | void> => {
    try {
      const user = await authorize(code, type);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: { user } });

      return user;
    } catch (error) {
      //@ts-ignore
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
