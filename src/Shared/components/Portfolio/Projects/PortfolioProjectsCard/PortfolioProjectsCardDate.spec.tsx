import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { OPPORTUNITY_PERIODS_QUERY } from '@dc/graphql/student/queries/opportunityPeriods';

import { PortfolioProjectType } from '@shared/components/Portfolio/types';
import i18n from '@shared/i18n';

import { PortfolioProjectsCardDate } from './PortfolioProjectsCardDate';

describe('PortfolioProjectsCardDate', () => {
  const getPeriodsSpy = jest.fn();

  it('should render period correctly when opportunity project', async () => {
    const mocks = [
      {
        request: {
          query: OPPORTUNITY_PERIODS_QUERY,
          variables: { id: '1' },
        },
        result: () => {
          getPeriodsSpy();

          return {
            data: {
              opportunity: {
                id: '1',
                periodStart: '2022-01-01',
                periodEnd: '2022-12-31',
              },
            },
          };
        },
      },
    ];

    const { container } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18nextProvider i18n={i18n}>
          <PortfolioProjectsCardDate
            projectId='1'
            submittedAt='2022-01-01'
            type={PortfolioProjectType.OPPORTUNITY}
          />
        </I18nextProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getPeriodsSpy).toHaveBeenCalledTimes(1);
    });

    const dateLabel = screen.getByText('Jan 1, 2022 - Dec 31, 2022');

    expect(dateLabel).toBeInTheDocument();

    userEvent.hover(dateLabel);

    const dateTooltip = await screen.findByRole('tooltip');
    expect(dateTooltip).toHaveTextContent('From January 1, 2022 to December 31, 2022');

    expect(container).toMatchSnapshot();
  });

  it('should render submitted date when not opportunity project', async () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <I18nextProvider i18n={i18n}>
          <PortfolioProjectsCardDate
            projectId='1'
            submittedAt='2022-01-01'
            type={PortfolioProjectType.LESSON}
          />
        </I18nextProvider>
      </MockedProvider>
    );

    const dateLabel = screen.getByText('Jan 1, 2022');

    expect(dateLabel).toBeInTheDocument();

    userEvent.hover(dateLabel);

    const dateTooltip = await screen.findByRole('tooltip');
    expect(dateTooltip).toHaveTextContent('January 1, 2022');

    expect(container).toMatchSnapshot();
  });
});
