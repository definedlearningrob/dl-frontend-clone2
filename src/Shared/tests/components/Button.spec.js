import { render, fireEvent } from '@testing-library/react';

import SharedButton from '@shared/components/Button/Button';

const onClick = jest.fn();

const renderButton = (props) => {
  const utils = render(<SharedButton children='Click me' {...props} />);
  const button = utils.getByTestId(/button/i);

  return { ...utils, button };
};

describe('SharedButton', () => {
  it('renders correctly', () => {
    const { button } = renderButton();

    expect(button).toBeInTheDocument();
  });

  it('calls "onClick" prop on button click', () => {
    const { button } = renderButton({ onClick: onClick });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled state works correctly', () => {
    const { button } = renderButton({ disabled: true });

    expect(button).toBeDisabled();
  });

  it('sets correct button type', () => {
    const { button, rerender } = renderButton({ type: 'submit' });

    expect(button).toHaveAttribute('type', 'submit');

    rerender(<SharedButton type='button'>Click me</SharedButton>);

    expect(button).toHaveAttribute('type', 'button');

    rerender(<SharedButton>Click me</SharedButton>);

    expect(button).toHaveAttribute('type', 'button');
  });

  it('displays spinner when isLoading prop is provided', () => {
    const { button, getByTestId } = renderButton({ isLoading: true });

    expect(button).toContainElement(getByTestId(/loading-spinner/i));
  });
});
