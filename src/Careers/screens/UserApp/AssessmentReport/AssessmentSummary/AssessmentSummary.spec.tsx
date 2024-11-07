import { ComponentProps } from 'react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';

import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';

import { AssessmentSummary } from './AssessmentSummary';

const defaultReportFilters = {
  schoolYear: { value: 2023, label: '2023 / 2024' },
  entities: [{ label: 'Clever District', value: '123' }],
  gradeLevels: [
    { label: '10', value: '1' },
    { label: '11', value: '1' },
  ],
  users: [
    { label: 'Anna Cityteach', value: '11' },
    { label: 'Bertha Daniel', value: '22' },
    { label: 'Cali Wolff', value: '33' },
  ],
  schoolClasses: [{ label: 'Statistics', value: '1234' }],
  entityFilter: '',
  userFilter: '',
  schoolClassFilter: '',
};

const defaultSummary = { assessmentCompleted: 124, assessmentTaken: 300 };

type Params = ComponentProps<typeof AssessmentSummary> & {
  reportFilters?: typeof defaultReportFilters;
};

const renderComponent = (params: Params) => {
  const { reportFilters = defaultReportFilters, ...props } = params;

  return renderWithI18N(
    <ReportFiltersProvider initialFilters={reportFilters}>
      <AssessmentSummary {...props} />
    </ReportFiltersProvider>
  );
};

describe('AssessmentSummary', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent({
      isLoading: false,
      summary: defaultSummary,
      studentsTotal: 676,
    });

    const gradeLevelsLabel = screen.getByText('2 grade levels');
    userEvent.hover(gradeLevelsLabel);
    const gradeLevelsTooltip = await screen.findByRole('tooltip');
    expect(gradeLevelsTooltip).toHaveTextContent('10');
    expect(gradeLevelsTooltip).toHaveTextContent('11');
    userEvent.unhover(gradeLevelsLabel);

    const schoolsLabel = screen.getByText('1 school');
    userEvent.hover(schoolsLabel);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Clever District');
    userEvent.unhover(schoolsLabel);

    const teachersLabel = screen.getByText('3 teachers');
    userEvent.hover(teachersLabel);
    const teachersTooltip = await screen.findByRole('tooltip');
    expect(teachersTooltip).toHaveTextContent('Anna Cityteach');
    expect(teachersTooltip).toHaveTextContent('Bertha Daniel');
    expect(teachersTooltip).toHaveTextContent('Cali Wolff');
    userEvent.unhover(teachersLabel);

    userEvent.hover(screen.getByText('1 class'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Statistics');

    const [takenSessessmentsCard, completedAssessmentsCard] =
      screen.getAllByTestId('assessment-summary-item');

    expect(takenSessessmentsCard).toHaveTextContent('Taken assessments');
    expect(takenSessessmentsCard).toHaveTextContent('300');

    expect(completedAssessmentsCard).toHaveTextContent('Completed assessments');
    expect(completedAssessmentsCard).toHaveTextContent('124');

    await waitFor(() => {
      expect(completedAssessmentsCard).toHaveStyle('opacity: 1; transform: none;');
    });

    expect(container).toMatchSnapshot();
  });

  it('should display loading state', () => {
    const { container } = renderComponent({ isLoading: true });

    expect(screen.queryAllByTestId('assessment-summary-item')).toHaveLength(0);
    expect(screen.getAllByTestId('loading-spinner')).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });
});
