import jwtDecode from 'jwt-decode';

import { TOKEN_KEY } from '@pbl/resources/constants';

type TUserType = 'user' | 'student';

type TAuthenticatedUser = {
  username: string;
  type: TUserType;
};

type TProvider = 'google' | 'clever' | 'classLink';

const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Service-Name': 'learning',
};

export const login = ({
  provider,
  password,
  login,
  domain,
  type,
}: {
  provider: TProvider | null;
  password: string;
  login: string;
  domain?: string;
  type: 'user' | 'student';
}): void | Promise<TAuthenticatedUser> =>
  provider ? _loginByProvider(provider, type) : _loginByCredentials(login, password, type, domain);

export const authorize = async (code: string, type: TUserType): Promise<TAuthenticatedUser> => {
  const entity = type === 'user' ? 'users' : 'students';

  const response = await fetch(
    `${import.meta.env.VITE_DL_API_HOST}/api/learning/v1/${entity}/oauth2_callback`,
    {
      method: 'POST',
      body: JSON.stringify({ auth_code: code }) /*eslint camelcase: 0*/,
      headers: API_HEADERS,
    }
  );

  return _processLoginResponse(response);
};

export const loginSharedSession = async (token: string) => {
  const body = {
    token,
  };
  const response = await fetch(`${import.meta.env.VITE_DL_API_HOST}/api/v1/shared_session`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: API_HEADERS,
  });

  return _processLoginResponse(response);
};

export const logout = ({ noRequest = false }: { noRequest?: boolean } = {}): void => {
  const token = localStorage.getItem(TOKEN_KEY) || '';
  const { scp: type }: { scp: TUserType } = jwtDecode(token);
  const entity = type === 'user' ? 'users' : 'students';

  _setToken('');

  if (noRequest) return;

  fetch(`${import.meta.env.VITE_DL_API_HOST}/api/learning/v1/${entity}/sign_out`, {
    method: 'DELETE',
    headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
  });
};

export const getCurrentUser = (): TAuthenticatedUser | null => {
  const token = localStorage.getItem(TOKEN_KEY);

  return token ? _extractUserDataFromToken(token) : null;
};

function _loginByProvider(provider: TProvider, type: TUserType): void {
  /*eslint no-undef: 0*/
  const providerLinks = {
    google: `${import.meta.env.VITE_PBL_GOOGLE_AUTH}/${type}`,
    clever: `${import.meta.env.VITE_PBL_CLEVER_AUTH}/${type}`,
    classLink: `${import.meta.env.VITE_PBL_CLASSLINK_AUTH}/${type}`,
  };

  window.location.href = providerLinks[provider];
}

function _setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

async function _loginByCredentials(
  login: string,
  password: string,
  type: string,
  domain?: string
): Promise<TAuthenticatedUser> {
  const entity = type === 'user' ? 'users' : 'students';
  const body =
    type === 'user'
      ? {
          user: {
            username: login,
            password,
          },
        }
      : {
          student: {
            username: login,
            password,
            domain,
          },
        };

  const response = await fetch(
    `${import.meta.env.VITE_DL_API_HOST}/api/learning/v1/${entity}/sign_in`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: API_HEADERS,
    }
  );

  return _processLoginResponse(response);
}

type JWTObject = {
  exp: number;
  username: string;
  scp: TUserType;
};

function _extractUserDataFromToken(token: string): TAuthenticatedUser | null {
  const { exp, username, scp }: JWTObject = jwtDecode(token);
  const now = Math.floor(new Date().getTime() / 1000);

  if (exp < now) return null;

  return { username, type: scp };
}

async function _processLoginResponse(response: Response): Promise<TAuthenticatedUser> {
  const json = await response.json();
  // removes visited flag from localStorage so welcome message shows on every login
  window.localStorage.removeItem('visited');
  if (!response.ok) {
    throw { message: json.errors[0].message, status: response.status };
  }

  _setToken(json.token);
  const extractedData = _extractUserDataFromToken(json.token);

  if (!extractedData) {
    throw { message: 'Token has expired', status: 401 };
  }

  return extractedData;
}

export const startImpersonate = async (studentUuid: string): Promise<TAuthenticatedUser> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(
    `${
      import.meta.env.VITE_DL_API_HOST
    }/api/v1/users/impersonates/start?student_uuid=${studentUuid}`,
    {
      method: 'POST',
      headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
    }
  );

  return _processLoginResponse(response);
};

export const stopImpersonate = async (): Promise<TAuthenticatedUser> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(
    `${import.meta.env.VITE_DL_API_HOST}/api/v1/users/impersonates/stop`,
    {
      method: 'POST',
      headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
    }
  );

  return _processLoginResponse(response);
};
