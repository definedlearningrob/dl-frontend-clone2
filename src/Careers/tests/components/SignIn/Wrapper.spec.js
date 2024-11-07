import { renderWithRouter } from '@dc/utils/test';

import UserSignInWelcomeBanner from '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner';

import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';

const renderSignInWrapper = () => {
  const utils = renderWithRouter(
    <SignInWrapper
      children={<div>Test content</div>}
      WelcomeBanner={UserSignInWelcomeBanner}
      backTo='/'
      headingText='Test heading text'
    />
  );
  const wrapper = utils.getByTestId(/signin-wrapper/i);

  return { ...utils, wrapper };
};

describe('SignInWrapper', () => {
  it('renders correctly', () => {
    const { wrapper } = renderSignInWrapper();

    expect(wrapper).toBeInTheDocument();
  });
});
