import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/react';

import App from '@dc/components/App';
import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import entitiesQuery from '@dc/graphql/user/queries/entities';
import notificationsQuery from '@dc/graphql/student/queries/notifications';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ROLES } from '@dc/resources/constants';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { COLLECTIONS_QUERY } from '@dc/graphql/shared/queries/collections';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import overallProgressQuery from '@dc/graphql/student/queries/overallProgress';

import { NOTIFICATION_SCOPES } from '@shared/resources/constants';

let assessmentAttemptStatusQuerySpy = jest.fn();

const mocks = [
  userInfoMock,
  studentInfoMock,
  {
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
  },
  {
    request: {
      query: entitiesQuery,
    },
    result: {
      data: {
        entities: [],
      },
    },
  },
  {
    request: {
      query: notificationsQuery,
      variables: { perPage: 10, page: 1, scope: NOTIFICATION_SCOPES.ALL },
    },
    result: {
      data: {
        notifications: {
          nodes: [],
          pagesCount: 0,
          nodesCount: 0,
        },
      },
    },
  },
  {
    request: {
      query: notificationsQuery,
      variables: { scope: NOTIFICATION_SCOPES.UNREAD },
    },
    result: {
      data: {
        notifications: {
          nodes: [],
          pagesCount: 0,
          nodesCount: 0,
        },
      },
    },
  },
  {
    request: {
      query: COLLECTIONS_QUERY,
      result: {
        data: {
          collections: [{ id: 1, name: 'Collection name' }],
        },
      },
    },
  },
  {
    request: {
      query: currentCoursesQuery,
    },
    result: {
      data: {
        currentCourses: {
          nodes: [],
        },
      },
    },
  },
  {
    request: { query: overallProgressQuery },
    result: { data: { overallProgress: {} } },
  },
];

const renderApp = (initialState, route) => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider>
        <ExpandSidebarProvider>
          <App />
        </ExpandSidebarProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route, initialState }
  );
  const app = utils.getByTestId(/^app/i);

  return { ...utils, app };
};

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', async () => {
    const { app } = renderApp();

    expect(app).toBeInTheDocument();
  });

  it('renders GuestApp when user is not logged in', async () => {
    const { app } = renderApp({ session: { user: null } });

    const guestApp = await screen.findByTestId(/guest-app/i);

    expect(app).toContainElement(guestApp);
  });

  it('renders StudentApp when user is logged in and is student type', async () => {
    const stateWithUser = {
      session: {
        user: {
          type: 'student',
        },
      },
    };
    const { app } = renderApp(stateWithUser);

    const studentApp = await screen.findByTestId(/student-app/i);
    expect(app).toContainElement(studentApp);

    await waitFor(() => {
      expect(assessmentAttemptStatusQuerySpy).toHaveBeenCalled();
    });
  });

  it('renders UserApp when user is logged in and is user type', async () => {
    const stateWithUser = {
      session: {
        user: {
          type: 'user',
        },
      },
    };
    const { app } = renderApp(stateWithUser);

    const userApp = await screen.findByTestId(/user-app/i);
    expect(app).toContainElement(userApp);
  });

  it('renders AdminApp when user is system_admin and there is admin url', async () => {
    const stateWithUser = {
      session: {
        user: {
          type: 'user',
          role: ROLES.SYSTEM_ADMIN,
        },
      },
    };
    const { app } = renderApp(stateWithUser, '/admin/courses');
    const adminApp = await screen.findByTestId(/admin-app/i);
    expect(app).toContainElement(adminApp);
  });
});
