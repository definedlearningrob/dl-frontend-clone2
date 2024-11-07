import { render } from '@testing-library/react';

import { ReactComponent as GoogleLogo } from '@shared/svg/google_logo.svg';
import SharedIcon from '@shared/components/Icon/Icon';

const renderIcon = (props) => {
  const utils = render(<SharedIcon icon={<GoogleLogo />} {...props} />);
  const icon = utils.getByTestId(/icon/i);

  return { ...utils, icon };
};

describe('SharedIcon', () => {
  it('renders correctly', () => {
    const { icon } = renderIcon();

    expect(icon).toBeInTheDocument();
  });

  it('applies correct class name on size prop', () => {
    const { icon, rerender } = renderIcon({ size: 'lg' });

    expect(icon).toHaveClass('icon -lg-size');

    rerender(<SharedIcon icon={<GoogleLogo />} size='sm' />);

    expect(icon).toHaveClass('icon -sm-size');
  });
});
