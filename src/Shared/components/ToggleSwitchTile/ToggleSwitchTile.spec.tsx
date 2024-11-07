import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToggleSwitchTile } from './ToggleSwitchTile';

describe('ToggleSwitchTile', () => {
  it('should render the section correctly', () => {
    const icon = () => <svg />;
    const { container } = render(
      <ToggleSwitchTile
        Icon={icon}
        description='Some text about the setting'
        isEnabled={true}
        name='setting'
        onChange={jest.fn}
      />
    );

    expect(screen.getByText('Some text about the setting')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call onChange callback when toggled', () => {
    const mockedOnChange = jest.fn();
    const icon = () => <svg />;
    render(
      <ToggleSwitchTile
        Icon={icon}
        description='Some text about the setting'
        isEnabled={true}
        name='setting'
        onChange={mockedOnChange}
      />
    );

    userEvent.click(screen.getByRole('switch'));

    expect(mockedOnChange).toHaveBeenCalledTimes(1);
  });
});
