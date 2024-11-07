import { screen, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import Dashboard from '@dc/screens/UserApp/Dashboard/Dashboard';
import systemAdminEntitiesQuery from '@dc/graphql/user/queries/systemAdminEntities';
import schoolClassesQuery from '@dc/graphql/user/queries/schoolClasses';
import schoolClassWithStudentsQuery from '@dc/graphql/user/queries/schoolClassWithStudents';
import userInfoQuery from '@dc/graphql/user/queries/userInfo';
import { CAREER_COURSE_SETTINGS_TYPES, ROLES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const entitiesMock = {
  request: {
    query: systemAdminEntitiesQuery,
    variables: {
      page: 1,
      perPage: 16,
      filter: { nameCont: undefined },
    },
  },
  result: {
    data: {
      adminDashboard: {
        entities: {
          pagesCount: 1,
          nodes: [
            {
              hierarchyMetrics: null,
              name: 'First entity',
              settings: { assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL },
              uuid: '1',
            },
            {
              hierarchyMetrics: null,
              name: 'Second entity',
              settings: { assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL },
              uuid: '2',
            },
            {
              hierarchyMetrics: null,
              name: 'Third entity',
              settings: { assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL },
              uuid: '3',
            },
            {
              hierarchyMetrics: null,
              name: 'Fourth entity',
              settings: { assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL },
              uuid: '4',
            },
          ],
        },
        userId: '1',
      },
    },
  },
};

const schoolClassesMock = {
  request: {
    query: schoolClassesQuery,
    variables: { perPage: 100 },
  },
  result: {
    data: {
      schoolClasses: {
        nodes: [
          {
            uuid: '1',
            name: 'First class',
            gradingNeeded: true,
            entity: {
              uuid: '1',
              name: 'First entity',
            },
          },
          {
            uuid: '2',
            name: 'Second class',
            gradingNeeded: false,
            entity: {
              uuid: '1',
              name: 'First entity',
            },
          },
          {
            uuid: '3',
            name: 'Third class',
            gradingNeeded: false,
            entity: {
              uuid: '2',
              name: 'Second entity',
            },
          },
          {
            uuid: '4',
            name: 'Fourth class',
            gradingNeeded: false,
            entity: {
              uuid: '3',
              name: 'Third entity',
            },
          },
        ],
      },
    },
  },
};

const schoolClassMock = {
  request: {
    query: schoolClassWithStudentsQuery,
    variables: {
      uuid: '1',
      filter: { fullNameCont: undefined },
    },
  },
  result: {
    data: {
      schoolClass: {
        uuid: '1',
        name: 'First class',
        students: {
          nodes: [
            {
              archivedAt: '',
              uuid: '1',
              firstName: 'Bruce',
              lastName: 'Wayne',
              gradingNeeded: true,
            },
            {
              archivedAt: '',
              uuid: '2',
              firstName: 'Peter',
              lastName: 'Parker',
              gradingNeeded: false,
            },
          ],
        },
      },
    },
  },
};

const getUserInfoValues = (role) => ({
  userInfo: {
    permissions: [],
    commonAppData: {
      hasRecommenderInvitation: false,
    },
    hasOpportunitiesEnabled: false,
    hasAccessToPbl: false,
    currentSchoolYear: 2023,
    email: 'bruce@wayne.com',
    hasUnreadConversation: false,
    firstName: 'Bruce',
    lastName: 'Wayne',
    role,
    status: 'status',
    username: 'brucewayne',
    uuid: 'someuuid',
    entities: {
      nodes: [
        {
          uuid: '1234',
          settings: {
            schoolYearStartDate: {
              month: 7,
              day: 1,
            },
          },
        },
      ],
    },
    __typename: 'userInfo',
  },
});

const getUserInfoMock = (role) => ({
  request: {
    query: userInfoQuery,
  },
  result: {
    data: getUserInfoValues(role),
  },
});

const defaultMocks = [entitiesMock, schoolClassesMock, schoolClassMock];

const renderUserAppDashboard = ({ role = ROLES.SYSTEM_ADMIN } = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, getUserInfoMock(role)]}>
      <NavigationContextProvider>
        <ExpandSidebarProvider>
          <UserInfoProvider value={getUserInfoValues(role)}>
            <Dashboard />
          </UserInfoProvider>
        </ExpandSidebarProvider>
      </NavigationContextProvider>
    </MockedProvider>,
    { initialState: { session: { user: null } } }
  );

describe('UserAppDashboard', () => {
  it('renders admin view for system admin', async () => {
    renderUserAppDashboard();

    expect(await screen.findByTestId(/admin-view/)).toBeInTheDocument();
  });
  it('renders teacher view for teacher', async () => {
    renderUserAppDashboard({ role: ROLES.TEACHER });

    expect(await screen.findByTestId(/teacher-view/)).toBeInTheDocument();
  });
  describe('AdminView', () => {
    it('renders proper entities list based on response', async () => {
      renderUserAppDashboard();

      const entities = await screen.findAllByTestId(/list-item/);

      expect(entities).toHaveLength(4);
      expect(entities[0]).toHaveTextContent('First entity');
      expect(entities[1]).toHaveTextContent('Second entity');
      expect(entities[2]).toHaveTextContent('Third entity');
      expect(entities[3]).toHaveTextContent('Fourth entity');
    });

    it('renders entity name with middle school label if entity has assessment type', async () => {
      renderUserAppDashboard();

      const entities = await screen.findAllByTestId(/list-item/);

      const firstEntityStageIcon = within(entities[0]).getByTestId('icon');
      userEvent.hover(firstEntityStageIcon);
      const firstEntityStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(firstEntityStageTooltip).toHaveTextContent('Middle School entity');
      userEvent.unhover(firstEntityStageIcon);

      const secondEntityStageIcon = within(entities[1]).getByTestId('icon');
      userEvent.hover(secondEntityStageIcon);
      const secondEntityStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(secondEntityStageTooltip).toHaveTextContent('High School entity');
      userEvent.unhover(secondEntityStageIcon);

      const thirdEntityStageIcon = within(entities[2]).getByTestId('icon');
      userEvent.hover(thirdEntityStageIcon);
      const thirdEntityStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(thirdEntityStageTooltip).toHaveTextContent('High School entity');
      userEvent.unhover(thirdEntityStageIcon);

      const fourthEntityStageIcon = within(entities[3]).getByTestId('icon');
      userEvent.hover(fourthEntityStageIcon);
      const fourthEntityStageTooltip = await screen.findByRole('tooltip', { hidden: true });
      expect(fourthEntityStageTooltip).toHaveTextContent('High School entity');
      userEvent.unhover(fourthEntityStageIcon);
    });

    it('renders proper tabs', async () => {
      renderUserAppDashboard();
      const tabs = await screen.findAllByTestId(/tab/);

      expect(tabs).toHaveLength(2);
      expect(tabs[0]).toHaveAttribute('data-testid', 'tab-entities');
      expect(tabs[1]).toHaveAttribute('data-testid', 'tab-users');
    });
  });

  describe('TeacherView', () => {
    it('renders teacher dashboard view correctly', async () => {
      renderUserAppDashboard({ role: ROLES.TEACHER });

      expect(await screen.findByTestId(/teacher-view/)).toBeInTheDocument();
    });
  });
});
