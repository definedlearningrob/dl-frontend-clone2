import { getCurrentUser } from '@pbl/services/session';
import { ActionTypes } from '@pbl/redux/session/types';

const initialState = {
  loginError: {},
  user: getCurrentUser(),
};

type TUserType = 'user' | 'student';
type TAuthenticatedUser = {
  username: string;
  type: TUserType;
};
type TLoginError = {
  accountArchived?: boolean;
  message?: string;
  status?: number;
};

const sessionReducer = (
  state = initialState,
  {
    type,
    payload,
  }: { type: ActionTypes; payload: { loginError: TLoginError; user: TAuthenticatedUser } }
): { loginError: TLoginError; user: TAuthenticatedUser | null } => {
  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginError: {},
        user: payload.user,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginError: payload.loginError,
        user: null,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        loginError: {},
        user: null,
      };

    case ActionTypes.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: {},
      };

    default:
      return state;
  }
};

export type SessionState = ReturnType<typeof sessionReducer>;

export default sessionReducer;
