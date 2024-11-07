import { screen } from '@testing-library/dom';

import { SERVICE_NAME } from '@shared/resources/enums';
import { renderWithRouter } from '@shared/utils/test';
import { TPerformanceIndicatorsData } from '@shared/graphql/fragments/goalPerformanceIndicatorsData';

import { PerformanceIndicators } from './PerformanceIndicators';

const data: TPerformanceIndicatorsData = [
  {
    averageScore: 3,
    tag: {
      name: 'Tag 1',
    },
    results: [
      {
        contextName: 'Empowering Through Leadership',
        gradedAt: '2023-12-12',
        origin: SERVICE_NAME.CAREERS,
        rubricName: 'Rubric 1',
        scoreEarned: 4,
      },
      {
        contextName: 'Classroom Architect',
        gradedAt: '2024-01-09',
        origin: SERVICE_NAME.LEARNING,
        rubricName: 'Rubric 2',
        scoreEarned: 2,
      },
    ],
  },
  {
    averageScore: 2.5,
    tag: {
      name: 'Tag 2',
    },
    results: [
      {
        contextName: 'Advertising and Promotions Managers',
        gradedAt: '2024-01-10',
        origin: SERVICE_NAME.CAREERS,
        rubricName: 'Rubric 11',
        scoreEarned: 2,
      },
      {
        contextName: 'Robot Designer',
        gradedAt: '2024-01-10',
        origin: SERVICE_NAME.LEARNING,
        rubricName: 'Rubric 12',
        scoreEarned: 3,
      },
    ],
  },
];

describe('PerformanceIndicators', () => {
  it('should render skeleton when loading', () => {
    const { container } = renderWithRouter(
      <PerformanceIndicators data={undefined} isLoading={true} />
    );

    expect(
      screen.getByRole('heading', { name: 'Student Performance Indicators' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Scores are normalized to 0-4 point scale./)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render empty state when there is no data', () => {
    const { container } = renderWithRouter(<PerformanceIndicators data={[]} isLoading={false} />);

    expect(
      screen.getByRole('heading', { name: 'Student Performance Indicators' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Scores are normalized to 0-4 point scale./)).not.toBeInTheDocument();
    expect(screen.getByText('Performance Indicators section is empty.')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render performance indicators charts', () => {
    const { container } = renderWithRouter(<PerformanceIndicators data={data} isLoading={false} />);

    expect(
      screen.getByRole('heading', { name: 'Student Performance Indicators (2)' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Scores are normalized to 0-4 point scale./)).toBeInTheDocument();

    const charts = screen.getAllByTestId('performance-indicators-chart');
    expect(charts).toHaveLength(2);
    expect(charts[0]).toHaveTextContent('Tag 1');
    expect(charts[1]).toHaveTextContent('Tag 2');

    expect(container).toMatchSnapshot();
  });
});
