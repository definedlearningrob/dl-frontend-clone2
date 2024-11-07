import { render, fireEvent, screen } from '@testing-library/react';

import SharedSwitch from '@shared/components/Switch/Switch';

const renderSwitch = (props) => {
  const utils = render(<SharedSwitch onChange={() => {}} {...props} />);
  const Switch = utils.getByRole('switch');

  return { ...utils, Switch };
};

describe('Switch', () => {
  it('should render correctly', () => {
    const { container } = renderSwitch({ label: 'Switch label' });
    expect(screen.getByText('Switch label')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('calls "onChange" prop on Switch change', () => {
    const onChange = jest.fn();

    const { Switch } = renderSwitch({ onChange });

    fireEvent.click(Switch);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled state works correctly', () => {
    const { Switch } = renderSwitch({ disabled: true });

    expect(Switch).toBeDisabled();
  });

  it('set switch on when value is true', () => {
    const { Switch } = renderSwitch({ value: true });

    expect(Switch).toBeChecked();
  });

  it('set switch off when value is false', () => {
    const { Switch } = renderSwitch({ value: false });

    expect(Switch).not.toBeChecked();
  });
});
