import { render, fireEvent } from '@testing-library/react';

import { ReactComponent as GoogleLogo } from '@dc/svg/google_logo.svg';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

const onClick = jest.fn();

const renderIconButton = (props) => {
  const utils = render(<DeprecatedIconButton icon={<GoogleLogo />} {...props} />);
  const iconButton = utils.getByTestId(/icon-button/i);

  return { ...utils, iconButton };
};

describe('SharedIconButton', () => {
  it('renders correctly', () => {
    const { iconButton } = renderIconButton();

    expect(iconButton).toBeInTheDocument();
  });

  it('calls "onClick" prop on button click', () => {
    const { iconButton } = renderIconButton({ onClick: onClick });

    fireEvent.click(iconButton);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled state works correctly', () => {
    const { iconButton } = renderIconButton({ disabled: true });

    expect(iconButton).toBeDisabled();
  });

  it('appends additional className from props', () => {
    const { iconButton } = renderIconButton({ className: 'test' });

    expect(iconButton).toHaveClass('icon-button test');
  });
});
