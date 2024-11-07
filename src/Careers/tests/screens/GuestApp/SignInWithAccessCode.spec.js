import GuestAppSignInWithAccessCode from '@dc/screens/GuestApp/SignInWithAccessCode/SignInWithAccessCode';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

jest.mock('@dc/redux/session/actions', () => ({
  loginAction: jest.fn().mockImplementation(() => ({
    type: 'session/LOGIN_SUCCESS',
    payload: { user: { name: 'John Doe' } },
  })),
}));

afterEach(() => jest.clearAllMocks());

const renderGuestAppSignInWithAccessCode = () => {
  const utils = renderWithRouterAndReduxProvider(<GuestAppSignInWithAccessCode />);

  return { ...utils };
};

describe('GuestAppSignInWithAccessCode', () => {
  it('renders correctly', () => {
    const { container } = renderGuestAppSignInWithAccessCode();

    expect(container).toBeInTheDocument();
  });
});
