import { render } from '@testing-library/react';

import ProgressCircle from '@dc/shared/ProgressCircle/ProgressCircle';

describe('ProgressCircle', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ProgressCircle />);

    expect(getByTestId(/progress-circle/)).toBeInTheDocument();
  });

  it('shows proper number status', () => {
    const { getByTestId } = render(<ProgressCircle target={10} value={5} />);

    expect(getByTestId(/progress-circle/)).toHaveTextContent('5/10');
  });
});
