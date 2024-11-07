import { fireEvent, screen, waitFor, within } from '@testing-library/dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import {
  CAREER_EXPLORATION_REPORT_FILTERS,
  TCareerExplorationReportFiltersData,
} from '@dc/graphql/user/queries/careerExplorationReportFilters';

import { renderWithRouter } from '@shared/utils/test';
import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

import { CareerExplorationReportFilters } from './CareerExplorationReportFilters';

const initialFilters = {
  schoolYear: { label: '2023 / 2024', value: 2023 },
  entities: [ALL_OPTION],
  gradeLevels: [ALL_OPTION],
  users: [ALL_OPTION],
  schoolClasses: [ALL_OPTION],
  entityFilter: '',
  userFilter: '',
  schoolClassFilter: '',
};

const careerPathwayReportFiltersResult: TCareerExplorationReportFiltersData = {
  pathwayReportFilters: {
    entities: {
      nodesCount: 1,
      pagesCount: 1,
      nodes: [
        {
          uuid: '1234-5678',
          name: 'City High School',
        },
      ],
    },
    gradeLevels: ['10', '11', '12', 'Postsecondary'],
    users: {
      nodesCount: 5,
      pagesCount: 1,
      nodes: [
        {
          uuid: '0987-6543',
          fullName: 'Abigail Cteach',
        },
        {
          uuid: '9876-5432',
          fullName: 'Anna Cityteach',
        },
        {
          uuid: '8765-4321',
          fullName: 'Bertha Daniel',
        },
        {
          uuid: '7654-3210',
          fullName: 'Braeden Glover',
        },
        {
          uuid: '6543-2109',
          fullName: 'Brianna Greene',
        },
      ],
    },
    schoolClasses: {
      nodesCount: 0,
      pagesCount: 0,
      nodes: [],
    },
  },
};

const assessmentReportFiltersMock: MockedResponse<TCareerExplorationReportFiltersData> = {
  request: {
    query: CAREER_EXPLORATION_REPORT_FILTERS,
    variables: {
      filters: {},
      entityFilter: { nameCont: '' },
      schoolClassFilter: { nameCont: '' },
      userFilter: { fullNameCont: '' },
    },
  },
  result: {
    data: careerPathwayReportFiltersResult,
  },
};

const renderComponent = (customMocks: MockedResponse[] = []) =>
  renderWithRouter(
    <MockedProvider mocks={[assessmentReportFiltersMock, ...customMocks]}>
      <NavigationContextProvider>
        <ReportFiltersProvider initialFilters={initialFilters}>
          <CareerExplorationReportFilters />
        </ReportFiltersProvider>
      </NavigationContextProvider>
    </MockedProvider>
  );

describe('CareerPathwayReportFilters', () => {
  it('should be initialized with correct value', () => {
    const { container } = renderComponent();

    const schoolsSelect = screen.getByTestId('report-filters-select-entities');
    const gradeLevelsSelect = screen.getByTestId('report-filters-select-gradeLevels');
    const teachersSelect = screen.getByTestId('report-filters-select-users');
    const classesSelect = screen.getByTestId('report-filters-select-schoolClasses');

    expect(within(schoolsSelect).getByTestId('select-chip')).toHaveTextContent('All');
    expect(within(gradeLevelsSelect).getByTestId('select-chip')).toHaveTextContent('All');
    expect(within(teachersSelect).getByTestId('select-chip')).toHaveTextContent('All');
    expect(within(classesSelect).getByTestId('select-chip')).toHaveTextContent('All');
    expect(screen.getByRole('combobox', { name: 'School Year 2023 / 2024' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate report' })).toBeEnabled();

    expect(container).toMatchSnapshot();
  });

  it('should disable "Generate report" button when filter is not selected', async () => {
    const refetchCareerPathwayFiltersSpy = jest.fn();

    renderComponent([
      {
        request: {
          query: CAREER_EXPLORATION_REPORT_FILTERS,
          variables: {
            filters: { gradeLevels: [] },
            entityFilter: { nameCont: '' },
            schoolClassFilter: { nameCont: '' },
            userFilter: { fullNameCont: '' },
          },
        },
        result() {
          refetchCareerPathwayFiltersSpy();

          return { data: careerPathwayReportFiltersResult };
        },
      },
    ]);

    const gradeLevelsSelect = screen.getByTestId('report-filters-select-gradeLevels');
    const clearButton = within(gradeLevelsSelect).getByRole('button', { name: 'Remove All' });

    fireEvent.click(clearButton);

    expect(screen.getByRole('button', { name: 'Generate report' })).toBeDisabled();

    await waitFor(() => {
      expect(refetchCareerPathwayFiltersSpy).toHaveBeenCalledTimes(1);
    });
  });
});
