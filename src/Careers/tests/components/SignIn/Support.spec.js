import { fireEvent } from '@testing-library/react';

import SignInSupport from '@dc/components/SignIn/Support/Support';
import { renderWithRouter } from '@dc/utils/test';

const renderSignInSupport = () => {
  const utils = renderWithRouter(
    <SignInSupport linkText='Get Help' path='/help' plainText='Having trouble?' />
  );

  const support = utils.getByTestId(/support/i);

  return { ...utils, support };
};

describe('SignInSupport', () => {
  it('renders correctly', () => {
    const { support } = renderSignInSupport();

    expect(support).toBeInTheDocument();
  });

  it('routes to proper location', () => {
    const { getByText, history } = renderSignInSupport();
    history.push = jest.fn();

    fireEvent.click(getByText(/get help/i));

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/help');
  });
});
