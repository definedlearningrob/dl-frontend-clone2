import SignInWelcomeBanner from '@dc/components/SignIn/WelcomeBanner/WelcomeBanner';
import { renderWithRouter } from '@dc/utils/test';

const renderSignInWelcomeBanner = () => {
  const utils = renderWithRouter(<SignInWelcomeBanner className='' />);
  const banner = utils.getByTestId(/welcome-banner/i);

  return { ...utils, banner };
};

describe('SignInWelcomeBanner', () => {
  it('renders correctly', () => {
    const { banner } = renderSignInWelcomeBanner();

    expect(banner).toBeInTheDocument();
  });
});
