import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  GenerateCareerExplorationReportDocument,
  CareerExplorationReportDocument,
  CareerExplorationReportQueryResult,
} from '@graphql/dc/users/hooks';
import {
  GenerateCareerExplorationReportMutationVariables,
  GenerateCareerExplorationReportMutation,
} from '@graphql/dc/users/operations';

import { renderWithRouter } from '@dc/utils/test';
import { careerExplorationReportMock } from '@dc/screens/UserApp/CareerPathwayReport/mocks';
import { CareerExplorationReport } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationReport';
import {
  careerExplorationReportFiltersMock,
  careerExplorationReportSummaryMock,
  careerExplorationReportVisitCountsMock,
} from '@dc/screens/UserApp/CareerExplorationReportFilters/mocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

const generateReportSpy = jest.fn();

const reportFilters = {
  schoolYear: { value: 2023, label: '2023 / 2024' },
  entities: [ALL_OPTION],
  gradeLevels: [ALL_OPTION],
  users: [ALL_OPTION],
  schoolClasses: [ALL_OPTION],
  entityFilter: '',
  userFilter: '',
  schoolClassFilter: '',
};

const generateCareerExplorationReportMock: MockedResponse<
  GenerateCareerExplorationReportMutation,
  GenerateCareerExplorationReportMutationVariables
> = {
  request: {
    query: GenerateCareerExplorationReportDocument,
    variables: {
      input: {
        schoolYear: 2023,
      },
    },
  },
  result() {
    generateReportSpy();

    return {
      data: {
        generatePathwayReport: {
          pathwayReport: {
            id: '1234-5678',
          },
        },
      },
    };
  },
};

const renderComponent = (mocks: MockedResponse[]) =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <ReportFiltersProvider initialFilters={reportFilters}>
        <FileDownloadProvider>
          <NavigationContextProvider>
            <CareerExplorationReport />
          </NavigationContextProvider>
        </FileDownloadProvider>
      </ReportFiltersProvider>
    </MockedProvider>
  );

describe('CareerExplorationReport', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent([
      careerExplorationReportSummaryMock,
      careerExplorationReportSummaryMock,
      careerExplorationReportVisitCountsMock,
      careerExplorationReportVisitCountsMock,
    ]);

    expect(
      await screen.findByRole('heading', { name: 'Career Exploration Report' })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should open filters modal after clicking on the button', async () => {
    renderComponent([careerExplorationReportSummaryMock, careerExplorationReportFiltersMock]);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Change filters' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const schoolsDropdown = await screen.findByRole('combobox', { name: 'Schools All' });

    expect(schoolsDropdown).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Grade Levels All' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Teachers All' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'School Year 2023 / 2024' })).toBeInTheDocument();
    expect(screen.getByTestId('report-filters-select-schoolClasses')).toHaveTextContent('All');
  });

  it('should display error message if there is an error', async () => {
    const careerExplorationReportErrorMock: MockedResponse<CareerExplorationReportQueryResult> = {
      request: {
        query: CareerExplorationReportDocument,
        variables: {
          filter: { schoolYear: 2023 },
        },
      },
      error: new Error('An error occured'),
    };

    renderComponent([careerExplorationReportErrorMock]);

    expect(
      await screen.findByText('An error occurred while loading the data.')
    ).toBeInTheDocument();
  });

  it('should generate report after clicking on the button', async () => {
    renderComponent([careerExplorationReportMock, generateCareerExplorationReportMock]);

    userEvent.click(screen.getByRole('button', { name: 'Download CSV' }));

    await waitFor(() => expect(generateReportSpy).toHaveBeenCalledTimes(1));
  });
});
