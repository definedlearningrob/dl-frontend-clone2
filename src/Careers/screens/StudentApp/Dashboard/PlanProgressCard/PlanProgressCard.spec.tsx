import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { PlanProgressQuery } from '@graphql/dc/students/operations';
import { PlanProgressDocument } from '@graphql/dc/students/hooks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@shared/utils/test';

import { PlanProgressCard } from './PlanProgressCard';

const planProgressMock: MockedResponse<PlanProgressQuery> = {
  request: {
    query: PlanProgressDocument,
  },
  result: {
    data: {
      plans: [
        {
          id: '1',
          name: 'Defined Portrait of a Graduate',
          progress: {
            completed: 7,
            total: 36,
          },
        },
      ],
    },
  },
};

const renderComponent = () =>
  renderWithRouter(
    <MockedProvider mocks={[planProgressMock]}>
      <PlanProgressCard />
    </MockedProvider>
  );

describe('PlanProgressCard', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent();

    expect(
      await screen.findByRole('heading', { name: 'Defined Portrait of a Graduate' })
    ).toBeInTheDocument();
    expect(screen.getByText('19%')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should navigate to plans after clicking on the button', async () => {
    const { history } = renderComponent();
    history.push = jest.fn();

    const button = await screen.findByRole('button', { name: 'View plan' });

    userEvent.click(button);

    expect(history.push).toHaveBeenCalledWith('/plans');
  });
});
