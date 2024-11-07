import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import i18n from '@dc/i18n';
import SignInLoginDivider from '@dc/components/SignIn/LoginDivider/LoginDivider';

const renderSignInLoginDivider = () => {
  const utils = render(
    <I18nextProvider i18n={i18n}>
      <SignInLoginDivider />
    </I18nextProvider>
  );

  const divider = utils.getByTestId(/login-divider/i);

  return { ...utils, divider };
};

describe('StudentSignInLoginDivider', () => {
  it('renders correctly', () => {
    const { divider } = renderSignInLoginDivider();

    expect(divider).toBeInTheDocument();
  });
});
