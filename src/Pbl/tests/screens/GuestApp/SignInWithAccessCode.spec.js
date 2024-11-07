import GuestAppSignInWithAccessCode from '@pbl/screens/GuestApp/SignInWithAccessCode/SignInWithAccessCode';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

jest.mock('@pbl/redux/session/actions', () => ({
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
