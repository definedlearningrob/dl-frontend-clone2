import { MockedProvider } from '@apollo/client/testing';

import GuestApp from '@dc/apps/GuestApp';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const renderGuestApp = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[]}>
      <GuestApp />
    </MockedProvider>
  );

describe('GuestApp', () => {
  it('renders correctly', () => {
    const { container } = renderGuestApp();

    expect(container).toBeInTheDocument();
  });
});
