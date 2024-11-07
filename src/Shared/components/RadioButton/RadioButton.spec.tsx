import { fireEvent, render, screen } from '@testing-library/react';

import { RadioButton } from '@shared/components/RadioButton/RadioButton';

describe('RadioButton', () => {
  it('should render correctly with passed children', () => {
    const { container } = render(
      <RadioButton name='radio name' value='radio value' onChange={jest.fn()}>
        Radio label
      </RadioButton>
    );

    expect(screen.getByText('Radio label')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call onChange when clicking radio button', () => {
    const onChangeMock = jest.fn();
    render(
      <RadioButton name='radio name' value='radio value' onChange={onChangeMock}>
        Radio label
      </RadioButton>
    );

    fireEvent.click(screen.getByRole('radio'));

    expect(onChangeMock).toHaveBeenCalled();
  });
});
