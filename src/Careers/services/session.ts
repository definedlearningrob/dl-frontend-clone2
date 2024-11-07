import jwtDecode from 'jwt-decode';

import { TOKEN_KEY } from '@dc/resources/constants';
import { APTITUDE_VARIABLES } from '@dc/resources/constants';

import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';

type TUserType = 'user' | 'student';

type TAuthenticatedUser = {
  username: string;
  type: TUserType;
};

type TProvider = 'google' | 'clever' | 'classLink';

const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Service-Name': 'careers',
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
}): void | Promise<TAuthenticatedUser> => {
  clearLocalStorageVariables();

  return provider
    ? _loginByProvider(provider, type)
    : _loginByCredentials(login, password, type, domain);
};

export const authorize = async (code: string, type: TUserType): Promise<TAuthenticatedUser> => {
  const entity = type === 'user' ? 'users' : 'students';

  const response = await fetch(
    `${import.meta.env.VITE_DC_API_HOST}/api/v1/${entity}/oauth2_callback`,
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
  const response = await fetch(`${import.meta.env.VITE_DC_API_HOST}/api/v1/shared_session`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: API_HEADERS,
  });

  return _processLoginResponse(response);
};

export const startImpersonate = async (
  userType: string,
  uuidToImpersonate: string
): Promise<TAuthenticatedUser> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(
    `${
      import.meta.env.VITE_DC_API_HOST
    }/api/v1/users/impersonates/start?impersonable_type=${userType}&impersonable_uuid=${uuidToImpersonate}`,
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
    `${import.meta.env.VITE_DC_API_HOST}/api/v1/users/impersonates/stop`,
    {
      method: 'POST',
      headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
    }
  );

  return _processLoginResponse(response);
};

export const logout = ({ noRequest = false }: { noRequest?: boolean } = {}): void => {
  const token = localStorage.getItem(TOKEN_KEY) || '';
  const { scp: type }: { scp: TUserType } = jwtDecode(token);
  const entity = type === 'user' ? 'users' : 'students';

  _setToken('');
  localStorage.removeItem(FILE_TO_DOWNLOAD_KEY);

  if (noRequest) return;

  fetch(`${import.meta.env.VITE_DC_API_HOST}/api/v1/${entity}/sign_out`, {
    method: 'DELETE',
    headers: { ...API_HEADERS, Authorization: `Bearer ${token}` },
  });
};

export const getCurrentUser = (): TAuthenticatedUser | null => {
  const token = localStorage.getItem(TOKEN_KEY);

  return token ? _extractUserDataFromToken(token) : null;
};

function _loginByProvider(provider: TProvider, type: TUserType): void {
  const providerLinks = {
    google: `${import.meta.env.VITE_DC_GOOGLE_AUTH}/${type}`,
    clever: `${import.meta.env.VITE_DC_CLEVER_AUTH}/${type}`,
    classLink: `${import.meta.env.VITE_DC_CLASSLINK_AUTH}/${type}`,
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

  const response = await fetch(`${import.meta.env.VITE_DC_API_HOST}/api/v1/${entity}/sign_in`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: API_HEADERS,
  });

  return _processLoginResponse(response);
}

type JWTObject = {
  exp: number;
  username: string;
  scp: TUserType;
};

function _extractUserDataFromToken(token: string): TAuthenticatedUser | null {
  const { username, scp }: JWTObject = jwtDecode(token);

  return { username, type: scp };
}

async function _processLoginResponse(response: Response): Promise<TAuthenticatedUser> {
  const json = await response.json();
  // removes visited flag from localStorage so welcome message shows on every login
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

function clearLocalStorageVariables() {
  localStorage.removeItem('visited');
  localStorage.removeItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY);
}
