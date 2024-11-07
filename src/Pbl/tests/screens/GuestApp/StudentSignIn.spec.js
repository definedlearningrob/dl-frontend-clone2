import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import GuestAppStudentSignIn from '@pbl/screens/GuestApp/StudentSignIn/StudentSignIn';
import { loginAction } from '@pbl/redux/session/actions';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

jest.mock('@pbl/redux/session/actions', () => ({
  loginAction: jest.fn().mockImplementation(() => ({
    type: 'session/LOGIN_SUCCESS',
    payload: { loginError: {}, user: { name: 'John Doe' } },
  })),
}));

afterEach(() => jest.clearAllMocks());

const renderGuestAppStudentSignIn = () => {
  const utils = renderWithRouterAndReduxProvider(<GuestAppStudentSignIn />);

  return { ...utils };
};

describe('GuestAppStudentSignIn', () => {
  it('renders correctly', () => {
    const { container } = renderGuestAppStudentSignIn();

    expect(container).toBeInTheDocument();
  });

  it('dispatches login action when student enters correct credentials', async () => {
    const { getByTestId } = renderGuestAppStudentSignIn();
    const damainInput = getByTestId(/domain-input/i);
    const usernameInput = getByTestId(/login-input/i);
    const passwordInput = getByTestId(/password-input/i);
    const submitButton = getByTestId(/login-submit/i);

    fireEvent.change(damainInput, { target: { value: 'School' } });
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: 'John Doe',
      password: '123456',
      domain: 'School',
      provider: null,
      type: 'student',
    });
  });

  it('does not dispatch login action when form inputs are empty', async () => {
    const { getByTestId } = renderGuestAppStudentSignIn();
    const submitButton = getByTestId(/login-submit/i);

    userEvent.click(submitButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(0));
  });

  it('dispatches login action on Google Login with proper params', async () => {
    renderGuestAppStudentSignIn();

    const googleButton = await screen.findByRole('button', {
      name: 'Google Login with Google',
    });

    userEvent.click(googleButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'google',
      type: 'student',
    });
  });

  it('dispatches login action on Clever Login with proper params', async () => {
    renderGuestAppStudentSignIn();

    const cleverButton = await screen.findByRole('button', {
      name: 'Clever Login with Clever',
    });

    userEvent.click(cleverButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'clever',
      type: 'student',
    });
  });

  it('dispatches login action on Class Link Login with proper params', async () => {
    renderGuestAppStudentSignIn();

    const classLinkButton = await screen.findByRole('button', {
      name: 'ClassLink Login with ClassLink',
    });

    userEvent.click(classLinkButton);

    await waitFor(() => expect(loginAction).toHaveBeenCalledTimes(1));
    expect(loginAction).toHaveBeenCalledWith({
      login: '',
      password: '',
      provider: 'classLink',
      type: 'student',
    });
  });
});
