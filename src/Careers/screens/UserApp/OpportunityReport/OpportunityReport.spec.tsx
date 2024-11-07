import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  CareerExplorationReportDocument,
  GenerateOpportunityReportDocument,
} from '@graphql/dc/users/hooks';
import {
  OpportunityReportSummaryQuery,
  OpportunityReportSummaryQueryVariables,
  GenerateOpportunityReportMutation,
  GenerateOpportunityReportMutationVariables,
} from '@graphql/dc/users/operations';

import { renderWithRouter } from '@dc/utils/test';
import {
  careerExplorationReportFiltersMock,
  opportunityApplicationsByClustersMock,
  opportunityApplicationsMock,
  opportunityApplicationsSpy,
  opportunityReportSummaryMock,
  summarySpy,
} from '@dc/screens/UserApp/OpportunityReportFilters/mocks';
import { OpportunityReport } from '@dc/screens/UserApp/OpportunityReport/OpportunityReport';
import { clustersMock, opportunityResultsMock } from '@dc/screens/UserApp/OpportunityReport/mocks';

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

const generateOpportunityReportMock: MockedResponse<
  GenerateOpportunityReportMutation,
  GenerateOpportunityReportMutationVariables
> = {
  request: {
    query: GenerateOpportunityReportDocument,
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
        generateOpportunityReport: {
          opportunityReport: {
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
            <OpportunityReport />
          </NavigationContextProvider>
        </FileDownloadProvider>
      </ReportFiltersProvider>
    </MockedProvider>
  );

describe('OpportunityReport', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent([
      opportunityReportSummaryMock,
      opportunityApplicationsMock,
      clustersMock,
      opportunityApplicationsByClustersMock,
      opportunityResultsMock,
    ]);

    expect(
      await screen.findByRole('heading', { name: 'Opportunities Report' })
    ).toBeInTheDocument();

    const opportunitiesCounterHeading = await screen.findByRole('heading', {
      name: 'Opportunities',
    });

    const virtualInternshipsCounterHeading = await screen.findByRole('heading', {
      name: 'Virtual Internships',
    });

    await waitFor(() => expect(summarySpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(opportunityApplicationsSpy).toHaveBeenCalledTimes(1));

    const opportunitiesCounter = await within(
      opportunitiesCounterHeading.parentElement!
    ).findByText('444');

    const virtualInternshipsCounter = await within(
      virtualInternshipsCounterHeading.parentElement!
    ).findByText('26');

    const opportunityChartsTitle = await screen.findAllByRole('heading', {
      name: 'Opportunity Applications',
    });

    expect(opportunitiesCounter).toBeInTheDocument();
    expect(virtualInternshipsCounter).toBeInTheDocument();
    expect(opportunityChartsTitle).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });

  it('should open filters modal after clicking on the button', async () => {
    renderComponent([
      opportunityReportSummaryMock,
      opportunityApplicationsMock,
      clustersMock,
      opportunityApplicationsByClustersMock,
      careerExplorationReportFiltersMock,
      opportunityResultsMock,
    ]);

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
    const opportunityReportErrorMock: MockedResponse<
      OpportunityReportSummaryQuery,
      OpportunityReportSummaryQueryVariables
    > = {
      request: {
        query: CareerExplorationReportDocument,
        variables: {
          filter: { schoolYear: 2023 },
        },
      },
      error: new Error('An error occurred'),
    };

    renderComponent([opportunityReportErrorMock]);

    expect(
      await screen.findByText('An error occurred while loading the data.')
    ).toBeInTheDocument();
  });

  it('should generate report after clicking on the button', async () => {
    renderComponent([
      opportunityReportSummaryMock,
      opportunityApplicationsMock,
      opportunityApplicationsByClustersMock,
      careerExplorationReportFiltersMock,
      opportunityResultsMock,
      clustersMock,
      generateOpportunityReportMock,
    ]);

    userEvent.click(screen.getByRole('button', { name: 'Download CSV' }));

    await waitFor(() => expect(generateReportSpy).toHaveBeenCalledTimes(1));
  });
});
