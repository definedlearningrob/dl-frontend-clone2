import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '@dc/utils/test';

import SharedBackwardButton from '@shared/components/BackwardButton/BackwardButton';

const renderBackwardButton = () => {
  const utils = renderWithRouter(<SharedBackwardButton link='/' />);
  const backwardButton = utils.getByTestId(/backward-button/i);

  return { ...utils, backwardButton };
};

describe('SharedBackwardButton', () => {
  it('renders correctly', () => {
    const { backwardButton } = renderBackwardButton();

    expect(backwardButton).toBeInTheDocument();
  });

  it('routes to proper location', () => {
    const { getByText, history } = renderBackwardButton();

    history.push = jest.fn();

    fireEvent.click(getByText(/^back/i));

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/');
  });
});
