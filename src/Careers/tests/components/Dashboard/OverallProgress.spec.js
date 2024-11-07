import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import OverallProgress from '@dc/components/Dashboard/OverallProgress/OverallProgress';
import overallProgressQuery from '@dc/graphql/student/queries/overallProgress';
import { renderWithI18N } from '@dc/utils/test';

let overallProgressQueryCalled = false;

const mocks = (customProgressMock) => {
  const defaultProgressMock = {
    assessmentFinished: false,
    courseCompleted: false,
    enrolledInCourse: false,
    finalReportSeen: false,
  };

  return [
    {
      request: {
        query: overallProgressQuery,
      },
      result: () => {
        overallProgressQueryCalled = true;

        return {
          data: {
            overallProgress: {
              ...(customProgressMock || defaultProgressMock),
              __typename: 'OverallProgress',
            },
          },
        };
      },
    },
  ];
};

const progressWithCompletedAssessment = {
  assessmentFinished: true,
  courseCompleted: false,
  enrolledInCourse: false,
  finalReportSeen: false,
};

const progressWithChosenCourse = {
  assessmentFinished: true,
  courseCompleted: false,
  enrolledInCourse: true,
  finalReportSeen: false,
};

const progressWithCompletedCourse = {
  assessmentFinished: true,
  courseCompleted: true,
  enrolledInCourse: true,
  finalReportSeen: false,
};

const progressWithSeenFinalReport = {
  assessmentFinished: true,
  courseCompleted: true,
  enrolledInCourse: true,
  finalReportSeen: true,
};

const renderOverallProgress = (customProgress) => {
  const utils = renderWithI18N(
    <MockedProvider mocks={mocks(customProgress)}>
      <OverallProgress />
    </MockedProvider>
  );

  return { ...utils };
};

describe('DashboardOverallProgress', () => {
  beforeEach(() => {
    overallProgressQueryCalled = false;
  });

  it('renders correctly', async () => {
    const { container } = renderOverallProgress();

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('calls query when renders', async () => {
    expect(overallProgressQueryCalled).toBe(false);

    renderOverallProgress();

    await waitFor(() => {
      expect(overallProgressQueryCalled).toBe(true);
    });
  });

  it('does not display any step with "done" status when there is no progress', async () => {
    const { getByTestId } = renderOverallProgress();

    await waitFor(() => {
      expect(getByTestId(/step-1/)).toHaveTextContent(/incomplete/i);
      expect(getByTestId(/step-2/)).toHaveTextContent(/incomplete/i);
      expect(getByTestId(/step-3/)).toHaveTextContent(/in progress/i);
      expect(getByTestId(/step-4/)).toHaveTextContent(/incomplete/i);
    });
  });

  it('indicates only 1st step "Complete Assessment" with "done" status when student finished assessment', async () => {
    const { getByTestId } = renderOverallProgress(progressWithCompletedAssessment);

    await waitFor(() => {
      expect(getByTestId(/step-1/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-2/)).toHaveTextContent(/incomplete/i);
      expect(getByTestId(/step-3/)).toHaveTextContent(/in progress/i);
      expect(getByTestId(/step-4/)).toHaveTextContent(/incomplete/i);
    });
  });

  it('indicates 1st & 2nd step "Choose Pathways & First Career Course" with "done" status when student is enrolled to course', async () => {
    const { getByTestId } = renderOverallProgress(progressWithChosenCourse);

    await waitFor(() => {
      expect(getByTestId(/step-1/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-2/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-3/)).toHaveTextContent(/in progress/i);
      expect(getByTestId(/step-4/)).toHaveTextContent(/incomplete/i);
    });
  });

  it('indicates 1st, 2nd & 3rd step "Complete Your First Course" with "done" status when student finished first course', async () => {
    const { getByTestId } = renderOverallProgress(progressWithCompletedCourse);

    await waitFor(() => {
      expect(getByTestId(/step-1/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-2/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-3/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-4/)).toHaveTextContent(/incomplete/i);
    });
  });

  it('indicates all steps, including 4th step "Review Final Report", with "done" status when student opened final report', async () => {
    const { getByTestId } = renderOverallProgress(progressWithSeenFinalReport);

    await waitFor(() => {
      expect(getByTestId(/step-1/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-2/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-3/)).toHaveTextContent(/done/i);
      expect(getByTestId(/step-4/)).toHaveTextContent(/done/i);
    });
  });
});
