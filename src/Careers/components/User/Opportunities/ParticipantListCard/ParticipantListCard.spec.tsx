import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ParticipantListCard } from '@dc/components/User/Opportunities/ParticipantListCard/ParticipantListCard';
import userInfoQuery from '@dc/graphql/user/queries/userInfo';
import { CAREER_COURSE_SETTINGS_TYPES, ROLES } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { OPPORTUNITY_QUERY } from '@dc/graphql/user/queries/opportunities';
import {
  OPPORTUNITY_APPLICATION_STATUS,
  OPPORTUNITY_TYPE,
  VISIBILITY_SCOPE,
} from '@dc/resources/enums';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

export const wblAdminMock = {
  request: {
    query: userInfoQuery,
  },
  result: {
    data: {
      userInfo: {
        hasAccessToPbl: true,
        commonAppData: {
          hasRecommenderInvitation: false,
          hasTeacherInvitation: false,
          hasCounselorInvitation: false,
          hasCounselorProfileFormCompleted: false,
          hasTeacherProfileFormCompleted: false,
        },
        settings: {
          assessmentEnabled: true,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
          onboardingEnabled: true,
        },
        permissions: {
          wblAdmin: true,
          counselor: false,
        },
        email: 'bruce@wayne.com',
        currentSchoolYear: '2023',
        hasUnreadConversation: false,
        hasOpportunitiesEnabled: true,
        firstName: 'Bruce',
        lastName: 'Wayne',
        role: ROLES.SYSTEM_ADMIN,
        status: 'status',
        username: 'brucewayne',
        uuid: 'someuuid',
        entities: {
          nodes: [],
        },
        __typename: 'userInfo',
      },
    },
  },
};

const opportunityMock = {
  request: {
    query: OPPORTUNITY_QUERY,
    variables: { id: '1', track: true },
  },
  result: {
    data: {
      opportunity: {
        virtualInternship: null,
        applications: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              id: '1',
              status: OPPORTUNITY_APPLICATION_STATUS.PENDING,
              student: {
                uuid: '1234-1234-1234-1234',
                fullName: 'Jon James',
                schoolClasses: [{ uuid: '4321-4321-4321-4321', name: 'Calculus' }],
              },
              appliedAt: '2021-04-20',
              answers: [],
              updatedAt: '2021-12-01',
            },
            {
              id: '2',
              status: OPPORTUNITY_APPLICATION_STATUS.REJECTED,
              student: {
                uuid: '1234-1234-1234-1235',
                fullName: 'Lebron James',
                schoolClasses: [{ uuid: '4321-4321-4321-4321', name: 'Calculus' }],
              },
              appliedAt: '2021-04-21',
              answers: [],
              updatedAt: '2021-12-01',
            },
            {
              id: '3',
              status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
              student: {
                uuid: '1234-1234-1234-1236',
                fullName: 'Betty Cooper',
                schoolClasses: [{ uuid: '4321-4321-4321-4321', name: 'Calculus' }],
              },
              appliedAt: '2021-04-31',
              answers: [],
              updatedAt: '2021-12-01',
            },
          ],
        },
        entities: [
          {
            uuid: '1234-1234-1234-1234',
            name: 'Process Engineering Intern at Hargrove Engineers & Constructors',
          },
        ],
        automaticAcceptance: false,
        availableSpots: 10,
        creditsOutcomes: 'Opportunity credits and outcomes',
        deadline: '2023-04-30',
        description: 'Opportunity description',
        id: '1',
        imageUrl: 'https://picsum.photos/400/300',
        thumbnailUrl: 'https://picsum.photos/400/300',
        location: 'New York',
        name: 'Avent Health Nursing Program - Intership',
        opportunityType: OPPORTUNITY_TYPE.INTERNSHIP,
        pathways: [{ id: '12', name: 'Healthcare' }],
        periodStart: '2023-05-30',
        periodEnd: '2024-05-30',
        salaryInformation: '$100,000 annual',
        tags: [],
        visibilityScope: VISIBILITY_SCOPE.ALL,
        hasPendingApplications: true,
        partner: {
          id: '3',
          name: 'Stark Industries',
        },
        imageFitToContainer: false,
      },
    },
  },
};
const mocks = [wblAdminMock, opportunityMock];

describe('ParticipantListCard', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory({ initialEntries: ['/opportunities/1'] });

    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <Route path='/opportunities/:id'>
          <UserInfoProvider
            value={{
              userInfo: {
                ...userInfoMock.result.data.userInfo,
                uuid: 'uuid-1',
                permissions: {
                  wblAdmin: true,
                  counselor: false,
                  canImpersonate: false,
                  canBrowseReports: false,
                },
              },
            }}>
            <ParticipantListCard />
          </UserInfoProvider>
        </Route>
      </MockedProvider>,
      { history }
    );

    expect(screen.getByRole('heading', { level: 5, name: 'Participant List' })).toBeInTheDocument();

    const firstApplication = await screen.findByText('Lebron James');
    const secondApplication = screen.getByText('Jon James');
    const thirdApplication = screen.getByText('Betty Cooper');

    expect(firstApplication).toBeInTheDocument();
    expect(secondApplication).toBeInTheDocument();
    expect(thirdApplication).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should have actions menu for WBL admin', async () => {
    const history = createMemoryHistory({ initialEntries: ['/opportunities/1'] });

    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <Route path='/opportunities/:id'>
          <UserInfoProvider
            value={{
              userInfo: {
                ...userInfoMock.result.data.userInfo,
                uuid: 'uuid-1',
                permissions: {
                  wblAdmin: true,
                  counselor: false,
                  canImpersonate: false,
                  canBrowseReports: false,
                },
              },
            }}>
            <ParticipantListCard />
          </UserInfoProvider>
        </Route>
      </MockedProvider>,
      { history }
    );

    expect(screen.getByRole('heading', { level: 5, name: 'Participant List' })).toBeInTheDocument();

    const actionMenuButtons = await screen.findAllByRole('button');

    expect(actionMenuButtons).toHaveLength(3);
  });

  it('should not have actions menu for user without WBL permission', async () => {
    const history = createMemoryHistory({ initialEntries: ['/opportunities/1'] });

    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <Route path='/opportunities/:id'>
          <UserInfoProvider value={{ userInfo: userInfoMock.result.data.userInfo }}>
            <ParticipantListCard />
          </UserInfoProvider>
        </Route>
      </MockedProvider>,
      { history }
    );

    expect(screen.getByRole('heading', { level: 5, name: 'Participant List' })).toBeInTheDocument();

    const actionMenuButtons = await screen.queryAllByRole('button');

    expect(actionMenuButtons).toHaveLength(0);
  });
});
