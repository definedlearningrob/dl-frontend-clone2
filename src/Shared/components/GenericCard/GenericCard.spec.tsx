import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@dc/utils/test';

import { ReactComponent as TestIcon } from '@shared/svg/download_to.svg';

import { GenericCard } from './GenericCard';

describe('GenericCard', () => {
  it('should render correctly as a link', () => {
    const { container } = renderWithRouter(
      <GenericCard
        Icon={TestIcon}
        TypeIcon={TestIcon}
        backgroundUrl='https://picsum.photos/600/300'
        pathways={[{ name: 'Pathway Name' }]}
        subTitle='Sub title'
        title='Title'
        to='courses'
        typeIconTooltipMessage='Tooltip message'
      />
    );

    const link = screen.getByRole('link', { name: 'Title' });
    const title = screen.getByRole('heading', { name: 'Title' });
    const subTitle = screen.getByRole('heading', { name: 'Sub title' });
    const pathwayName = screen.getByText('Pathway Name');

    expect(link).toHaveAttribute('href', '/courses');
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(pathwayName).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly as a button', () => {
    const onClickSpy = jest.fn();

    const { container } = renderWithRouter(
      <GenericCard
        Icon={TestIcon}
        TypeIcon={TestIcon}
        backgroundUrl='https://picsum.photos/600/300'
        pathways={[{ name: 'Pathway Name - as a button' }]}
        subTitle='Sub title - as a button'
        title='Title - as a button'
        typeIconTooltipMessage='Tooltip message - as a button'
        onClick={onClickSpy}
      />
    );

    const button = screen.getByRole('button', {
      name: 'Title - as a button',
    });

    const title = screen.getByRole('heading', { name: 'Title - as a button' });
    const subTitle = screen.getByRole('heading', { name: 'Sub title - as a button' });
    const pathwayName = screen.getByText('Pathway Name - as a button');

    userEvent.click(button);

    expect(onClickSpy).toHaveBeenCalledTimes(1);

    expect(button).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(pathwayName).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
