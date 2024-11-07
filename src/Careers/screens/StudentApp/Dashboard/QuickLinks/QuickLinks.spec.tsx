import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { set } from 'lodash-es';
import { screen, waitFor } from '@testing-library/react';
import {
  AssessmentAttemptStatusDocument,
  OverallProgressDocument,
} from '@graphql/dc/students/hooks';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { QuickLinks } from '@dc/screens/StudentApp/Dashboard/QuickLinks/QuickLinks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';

const assessmentStatusSpy = jest.fn();
const overallProgressSpy = jest.fn();

const notStartedAssessmentStatusMock = {
  request: {
    query: AssessmentAttemptStatusDocument,
  },
  result: {
    data: {
      assessmentProgress: {
        attempt: {
          updatedAt: null,
          assessmentType: ASSESSMENT_TYPES.MIDDLE_SCHOOL,
          id: '1',
          status: 'NOT_STARTED',
        },
      },
    },
  },
};

const inProgressAssessmentStatusMock = {
  request: {
    query: AssessmentAttemptStatusDocument,
  },
  result() {
    assessmentStatusSpy();

    return {
      data: {
        assessmentProgress: {
          attempt: {
            updatedAt: '2021-09-01T14:55:28Z',
            assessmentType: ASSESSMENT_TYPES.MIDDLE_SCHOOL,
            id: '1',
            status: 'IN_PROGRESS',
          },
        },
      },
    };
  },
};

const finishedAssessmentStatusMock = {
  request: {
    query: AssessmentAttemptStatusDocument,
  },
  result() {
    assessmentStatusSpy();

    return {
      data: {
        assessmentProgress: {
          attempt: {
            updatedAt: '2021-09-01T14:55:28Z',
            assessmentType: ASSESSMENT_TYPES.MIDDLE_SCHOOL,
            id: '1',
            status: 'FINISHED',
          },
        },
      },
    };
  },
};

const overallProgressMock = {
  request: {
    query: OverallProgressDocument,
  },
  result() {
    overallProgressSpy();

    return {
      data: {
        overallProgress: {
          enrolledInCourse: true,
          assessmentFinished: false,
          courseCompleted: false,
          finalReportSeen: false,
        },
      },
    };
  },
};

const renderComponent = (mocks: MockedResponse[] = [], userInfo = studentInfoMock.result.data) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider value={userInfo}>
        <QuickLinks />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('QuickLinks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('with enabled assessment', () => {
    describe('with not completed assessment', () => {
      it('should render assessment and survey links', async () => {
        const { container } = renderComponent([
          notStartedAssessmentStatusMock,
          overallProgressMock,
        ]);

        expect(await screen.findByRole('heading', { name: 'Highlights' })).toBeInTheDocument();

        await waitFor(() => {
          expect(overallProgressSpy).toHaveBeenCalled();
        });

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
        expect(links[0]).toHaveTextContent('Take the assessment');
        expect(links[1]).toHaveTextContent('Career review survey');
        expect(links[2]).toHaveTextContent('Final Report');

        expect(container).toMatchSnapshot();
      });
    });

    describe('with assessment in-progress', () => {
      it('should render all links', async () => {
        const { container } = renderComponent([
          inProgressAssessmentStatusMock,
          overallProgressMock,
        ]);

        expect(await screen.findByRole('heading', { name: 'Highlights' })).toBeInTheDocument();

        await waitFor(() => {
          expect(assessmentStatusSpy).toHaveBeenCalled();
        });

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4);

        expect(links[0]).toHaveTextContent('Assessment recommendation');

        expect(links[1]).toHaveTextContent('Continue assessmentLast updated: Sep 1, 2021');
        expect(links[1]).toHaveAttribute('href', '/onboarding');

        expect(links[2]).toHaveTextContent('Career review survey');
        expect(links[3]).toHaveTextContent('Final Report');

        expect(container).toMatchSnapshot();
      });
    });

    describe('with completed assessment', () => {
      it('should render all links', async () => {
        const { container } = renderComponent([finishedAssessmentStatusMock, overallProgressMock]);

        await waitFor(() => {
          expect(assessmentStatusSpy).toHaveBeenCalled();
        });

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4);
        expect(links[0]).toHaveTextContent('Assessment recommendation');
        expect(links[1]).toHaveTextContent('Retake assessmentLast updated: Sep 1, 2021');
        expect(links[2]).toHaveTextContent('Career review survey');
        expect(links[3]).toHaveTextContent('Final Report');

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('with disabled assessment', () => {
    it('should render only one link', async () => {
      const userInfoWithDisabledAssessment = set(
        studentInfoMock.result.data,
        'userInfo.settings.assessmentEnabled',
        false
      );
      const { container } = renderComponent(
        [notStartedAssessmentStatusMock, overallProgressMock],
        userInfoWithDisabledAssessment
      );

      expect(await screen.findByRole('heading', { name: 'Highlights' })).toBeInTheDocument();

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveTextContent('Career review survey');
      expect(links[1]).toHaveTextContent('Final Report');

      expect(container).toMatchSnapshot();
    });
  });
});
