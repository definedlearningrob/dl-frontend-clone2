import { waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import createAssessmentAttemptMutation from '@dc/graphql/student/mutations/createAssessmentAttempt';
import notificationsQuery from '@dc/graphql/student/queries/notifications';
import StudentApp from '@dc/apps/StudentApp';
import { renderWithReduxProvider } from '@dc/utils/test';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { ToastContextProvider } from '@dc/context/toastContext';
import { ASSESSMENT_STATUSES } from '@dc/resources/constants';
import cacheConfig from '@dc/graphql/cacheConfig';

import { NOTIFICATION_SCOPES } from '@shared/resources/constants';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';

const assessmentAttemptStatusQuerySpy = jest.fn();
const createAttemptMutationSpy = jest.fn();

const initialState = {
  session: {
    user: {
      type: 'student',
    },
  },
};

const attemptStatusMock = {
  request: {
    query: assessmentAttemptStatusQuery,
  },
  result: () => {
    assessmentAttemptStatusQuerySpy();

    return {
      data: {
        assessmentProgress: {
          attempt: null,
        },
      },
    };
  },
};

const progressMock = {
  request: {
    query: assessmentAttemptStatusQuery,
  },
  result: () => ({
    data: {
      assessmentProgress: {
        attempt: null,
        interestsAnswers: [],
        result: null,
        studyPreferencesAnswers: [],
        workValuesAnswers: [],
        status: {
          interests: ASSESSMENT_STATUSES.NOT_STARTED,
          studyPreferences: ASSESSMENT_STATUSES.NOT_STARTED,
          workValues: ASSESSMENT_STATUSES.NOT_STARTED,
        },
      },
      currentCourses: [],
    },
  }),
};

const createAttemptMock = {
  request: {
    query: createAssessmentAttemptMutation,
    variables: {
      input: {},
    },
  },
  result: () => {
    createAttemptMutationSpy();

    return {
      data: {
        createAssessmentAttempt: {
          id: '1',
        },
      },
    };
  },
};

const mocks = [
  attemptStatusMock,
  studentInfoMock,
  progressMock,
  progressMock,
  createAttemptMock,
  {
    request: {
      query: notificationsQuery,
      variables: { perPage: 10, page: 1, scope: NOTIFICATION_SCOPES.ALL },
    },
    result: () => ({
      data: {
        notifications: {
          nodes: [],
          pagesCount: 0,
          nodesCount: 0,
        },
      },
    }),
  },
  {
    request: {
      query: notificationsQuery,
      variables: { scope: NOTIFICATION_SCOPES.UNREAD },
    },
    result: () => ({
      data: {
        notifications: {
          nodes: [],
          pagesCount: 0,
          nodesCount: 0,
        },
      },
    }),
  },
];

const renderStudentApp = (passedMocks) => {
  const utils = renderWithReduxProvider(
    <Router>
      <MockedProvider cache={cacheConfig} mocks={passedMocks || mocks}>
        <ToastContextProvider>
          <UserInfoProvider
            value={{
              userInfo: {
                settings: { onboardingEnabled: true, assessmentEnabled: true },
              },
            }}>
            <PresentationStateProvider>
              <StudentApp />
            </PresentationStateProvider>
          </UserInfoProvider>
        </ToastContextProvider>
      </MockedProvider>
    </Router>,
    { initialState }
  );

  return { ...utils };
};

describe('StudentApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { container } = renderStudentApp();

    await waitFor(() => {
      expect(assessmentAttemptStatusQuerySpy).toHaveBeenCalled();
    });

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId(/first-login/)).toBeInTheDocument();
  });

  it('calls create attempt mutation on get started click', async () => {
    renderStudentApp();

    userEvent.click(screen.getByTestId(/create-first-attempt/));

    await waitFor(() => {
      expect(createAttemptMutationSpy).toHaveBeenCalled();
    });
  });
});
