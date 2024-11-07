import { render } from '@testing-library/react';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<SharedLoadingSpinner />);

    expect(getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });
});
