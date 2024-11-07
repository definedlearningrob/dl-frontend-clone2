import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import GuestAppUserSignIn from '@pbl/screens/GuestApp/UserSignIn/UserSignIn';
import { loginAction } from '@pbl/redux/session/actions';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

jest.mock('@pbl/redux/session/actions', () => ({
  loginAction: jest.fn().mockImplementation(() => ({
    type: 'session/LOGIN_SUCCESS',
    payload: { user: { name: 'John Doe' } },
  })),
}));

afterEach(() => jest.clearAllMocks());

const renderGuestAppUserSignIn = () => {
  const utils = renderWithRouterAndReduxProvider(<GuestAppUserSignIn />);

  return { ...utils };
};

describe('GuestAppUserSignIn', () => {
  it('renders correctly', () => {
    const { container } = renderGuestAppUserSignIn();

    expect(container).toBeInTheDocument();
  });

  it('dispatches login action when user enters correct credentials', async () => {
    const { getByTestId } = renderGuestAppUserSignIn();

    const usernameInput = getByTestId(/login-input/i);
    const passwordInput = getByTestId(/password-input/i);
    const submitButton = getByTestId(/login-submit/i);

    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: 'John Doe',
      password: '123456',
      provider: null,
      type: 'user',
    });
  });

  it('does not dispatch login action when form inputs are empty', async () => {
    const { getByTestId } = renderGuestAppUserSignIn();
    const submitButton = getByTestId(/login-submit/i);

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledTimes(0);
    });
  });

  it('dispatches login action on Google Login with proper params', async () => {
    renderGuestAppUserSignIn();

    const googleButton = await screen.findByRole('button', {
      name: 'Google Login with Google',
    });

    userEvent.click(googleButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'google',
      type: 'user',
    });
  });

  it('dispatches login action on Clever Login with proper params', async () => {
    renderGuestAppUserSignIn();

    const cleverButton = await screen.findByRole('button', {
      name: 'Clever Login with Clever',
    });

    userEvent.click(cleverButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'clever',
      type: 'user',
    });
  });

  it('dispatches login action on Class Link Login with proper params', async () => {
    renderGuestAppUserSignIn();

    const classLinkButton = await screen.findByRole('button', {
      name: 'ClassLink Login with ClassLink',
    });

    userEvent.click(classLinkButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'classLink',
      type: 'user',
    });
  });
});
