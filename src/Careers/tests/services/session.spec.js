import { waitFor } from '@testing-library/dom';

import { authorize, login, logout, startImpersonate, stopImpersonate } from '@dc/services/session';
import { TOKEN_KEY } from '@dc/resources/constants';

/*eslint max-len: 0*/
const dummyToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

delete window.location;
window.location = { href: '' };

describe('services | session', () => {
  beforeEach(() => {
    /*eslint no-undef: 0*/
    jest.clearAllMocks();
    expect(localStorage.setItem(TOKEN_KEY, ''));
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: dummyToken,
          }),
      })
    );
  });

  it('creates proper login request when calling with user type', () => {
    login({ password: 'somepass', login: 'somelogin', type: 'user' });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${process.env.VITE_DC_API_HOST}/api/v1/users/sign_in`, {
      body: JSON.stringify({
        user: {
          username: 'somelogin',
          password: 'somepass',
        },
      }),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Service-Name': 'careers',
      },
    });
  });

  it('creates proper login request when calling with student type and sets token based on response', async () => {
    login({ password: 'somepass', login: 'somelogin', domain: 'somedomain', type: 'student' });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${process.env.VITE_DC_API_HOST}/api/v1/students/sign_in`, {
      body: JSON.stringify({
        student: {
          username: 'somelogin',
          password: 'somepass',
          domain: 'somedomain',
        },
      }),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Service-Name': 'careers',
      },
    });

    await waitFor(() => expect(localStorage.getItem(TOKEN_KEY)).toEqual(dummyToken));
  });

  it('creates proper authorize request when calling with user type and sets token based on response', async () => {
    authorize('somecode', 'user');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_DC_API_HOST}/api/v1/users/oauth2_callback`,
      {
        body: JSON.stringify({
          //eslint-disable-next-line camelcase
          auth_code: 'somecode',
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Service-Name': 'careers',
        },
      }
    );

    await waitFor(() => expect(localStorage.getItem(TOKEN_KEY)).toEqual(dummyToken));
  });

  it('creates proper authorize request when calling with student type and sets token based on response', async () => {
    authorize('somecode', 'student');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_DC_API_HOST}/api/v1/students/oauth2_callback`,
      {
        body: JSON.stringify({
          //eslint-disable-next-line camelcase
          auth_code: 'somecode',
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Service-Name': 'careers',
        },
      }
    );

    await waitFor(() => expect(localStorage.getItem(TOKEN_KEY)).toEqual(dummyToken));
  });

  it('throws error on login when response is not ok', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            errors: [{ message: 'someerrorhere' }],
          }),
      })
    );

    login({})
      .then(() => {
        expect(true).toEqual(false);
      })
      .catch((error) => {
        expect(error).toEqual({ message: 'someerrorhere' });
      });
  });

  it('throws error on authorize when response is not ok', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            errors: [{ message: 'someerrorhere' }],
          }),
      })
    );

    authorize({})
      .then(() => {
        expect(true).toEqual(false);
      })
      .catch((error) => {
        expect(error).toEqual({ message: 'someerrorhere' });
      });
  });

  it('does not call login api when passed provider', () => {
    login({ provider: 'google' });
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('set proper url based on type and provider', () => {
    login({ provider: 'google', type: 'student' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_GOOGLE_AUTH}/student`);

    login({ provider: 'google', type: 'user' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_GOOGLE_AUTH}/user`);

    login({ provider: 'clever', type: 'student' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_CLEVER_AUTH}/student`);

    login({ provider: 'clever', type: 'user' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_CLEVER_AUTH}/user`);

    login({ provider: 'classLink', type: 'student' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_CLASSLINK_AUTH}/student`);

    login({ provider: 'classLink', type: 'user' });

    expect(window.location.href).toEqual(`${process.env.VITE_DC_CLASSLINK_AUTH}/user`);
  });

  it('calls DELETE on logout and clears token', () => {
    const dummyToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkbGNhcmVlcnMiLCJ1c2VybmFtZSI6InN5c3RlbV9hZG1pbiIsInN1YiI6IjIwOWVkYzBlLTY3MzYtNGIyMi1hNTZkLWVmYTg1OWYzOWZiOSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTU5Njc5OTc1MCwiZXhwIjoxNTk2ODAzMzUwLCJqdGkiOiJlNmY4NjE5Yi1hZWE4LTRhZDctOTNiMS00NDRlMDliMDE2YjgifQ._x1XIBwvrRDhPAVp1Zx_wPmgEfC7VxWi_vE2HuQrCP0';
    localStorage.setItem(TOKEN_KEY, dummyToken);

    logout();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${process.env.VITE_DC_API_HOST}/api/v1/users/sign_out`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dummyToken}`,
        'Service-Name': 'careers',
      },
    });
    expect(localStorage.getItem(TOKEN_KEY)).toEqual('');
  });

  it('creates proper stop impersonate request', () => {
    const dummyToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkbGNhcmVlcnMiLCJ1c2VybmFtZSI6InN5c3RlbV9hZG1pbiIsInN1YiI6IjIwOWVkYzBlLTY3MzYtNGIyMi1hNTZkLWVmYTg1OWYzOWZiOSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTU5Njc5OTc1MCwiZXhwIjoxNTk2ODAzMzUwLCJqdGkiOiJlNmY4NjE5Yi1hZWE4LTRhZDctOTNiMS00NDRlMDliMDE2YjgifQ._x1XIBwvrRDhPAVp1Zx_wPmgEfC7VxWi_vE2HuQrCP0';
    localStorage.setItem(TOKEN_KEY, dummyToken);
    stopImpersonate();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_DC_API_HOST}/api/v1/users/impersonates/stop`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dummyToken}`,
          'Service-Name': 'careers',
        },
      }
    );
  });

  it('creates proper start impersonate request', () => {
    const dummyToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkbGNhcmVlcnMiLCJ1c2VybmFtZSI6InN5c3RlbV9hZG1pbiIsInN1YiI6IjIwOWVkYzBlLTY3MzYtNGIyMi1hNTZkLWVmYTg1OWYzOWZiOSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTU5Njc5OTc1MCwiZXhwIjoxNTk2ODAzMzUwLCJqdGkiOiJlNmY4NjE5Yi1hZWE4LTRhZDctOTNiMS00NDRlMDliMDE2YjgifQ._x1XIBwvrRDhPAVp1Zx_wPmgEfC7VxWi_vE2HuQrCP0';
    const uuid = 'dummyuuid';
    const dummyUser = 'user';
    localStorage.setItem(TOKEN_KEY, dummyToken);
    startImpersonate(dummyUser, uuid);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITE_DC_API_HOST}/api/v1/users/impersonates/start?impersonable_type=${dummyUser}&impersonable_uuid=${uuid}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dummyToken}`,
          'Service-Name': 'careers',
        },
      }
    );
  });
});
