import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '@dc/utils/test';
import {
  ASSESSMENT_REPORT,
  TAssessmentReportData,
} from '@dc/graphql/user/queries/reportsAssessmentReport';
import {
  GENERATE_ASSESSMENT_REPORT,
  TGenerateAssessmentReportData,
  TGenerateAssessmentReportVariables,
} from '@dc/graphql/user/mutations/generateAssessmentReport';
import {
  assessmentReportFiltersMock,
  assessmentReportMock,
} from '@dc/screens/UserApp/AssessmentReport/mocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

import { AssessmentReport } from './AssessmentReport';

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

const generateAssessmentReportMock: MockedResponse<
  TGenerateAssessmentReportData,
  TGenerateAssessmentReportVariables
> = {
  request: {
    query: GENERATE_ASSESSMENT_REPORT,
    variables: {
      input: {
        startYear: 2023,
      },
    },
  },
  result() {
    generateReportSpy();

    return {
      data: {
        generateAssessmentReport: {
          assessmentReport: {
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
            <AssessmentReport />
          </NavigationContextProvider>
        </FileDownloadProvider>
      </ReportFiltersProvider>
    </MockedProvider>
  );

describe('AssessmentReport', () => {
  it('should render correctly', async () => {
    const { container } = renderComponent([assessmentReportMock]);

    expect(await screen.findByRole('heading', { name: 'Assessment Report' })).toBeInTheDocument();
    const [, completedAssessmentsCard] = await screen.findAllByTestId('assessment-summary-item');

    await waitFor(() => {
      expect(completedAssessmentsCard).toHaveStyle('opacity: 1; transform: none;');
    });

    expect(container).toMatchSnapshot();
  });

  it('should open filters modal after clicking on the button', async () => {
    renderComponent([assessmentReportMock, assessmentReportFiltersMock]);

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
    const assessmentReportErrorMock: MockedResponse<TAssessmentReportData> = {
      request: {
        query: ASSESSMENT_REPORT,
        variables: {
          filter: { schoolYear: 2023 },
        },
      },
      error: new Error('An error occured'),
    };

    renderComponent([assessmentReportErrorMock]);

    expect(
      await screen.findByText('An error occurred while loading the data.')
    ).toBeInTheDocument();
  });

  it('should display component result depending on selected tab', async () => {
    renderComponent([assessmentReportMock]);

    expect(await screen.findByRole('tab', { name: 'All' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    const componentResultSections = screen.getAllByTestId('component-result-section');
    expect(componentResultSections).toHaveLength(2);
    expect(componentResultSections[0]).toHaveTextContent('Middle School Study Preferences');
    expect(componentResultSections[0]).toHaveTextContent('Middle School Interests');
    expect(componentResultSections[0]).toHaveTextContent('Middle School Work Values');
    expect(componentResultSections[1]).toHaveTextContent('High School Study Preferences');
    expect(componentResultSections[1]).toHaveTextContent('High School Interests');
    expect(componentResultSections[1]).toHaveTextContent('High School Work Values');

    const middleSchoolTab = screen.getByRole('tab', { name: 'Middle School' });
    const highSchoolTab = screen.getByRole('tab', { name: 'High School' });

    userEvent.click(middleSchoolTab);

    expect(screen.getAllByTestId('component-result-section')).toHaveLength(1);
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'Middle School Study Preferences'
    );
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'Middle School Interests'
    );
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'Middle School Work Values'
    );

    userEvent.click(highSchoolTab);

    expect(screen.getAllByTestId('component-result-section')).toHaveLength(1);
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'High School Study Preferences'
    );
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'High School Interests'
    );
    expect(screen.getByTestId('component-result-section')).toHaveTextContent(
      'High School Work Values'
    );

    userEvent.click(middleSchoolTab);
  });

  it('should generate report after clicking on the button', async () => {
    renderComponent([assessmentReportMock, generateAssessmentReportMock]);

    userEvent.click(screen.getByRole('button', { name: 'Generate report' }));

    await waitFor(() => expect(generateReportSpy).toHaveBeenCalledTimes(1));
  });
});
