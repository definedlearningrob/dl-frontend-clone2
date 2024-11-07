import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/dom';
import { ReportTypes } from '@graphql/shared/shared/types';

import { UserInfoProvider } from '@pbl/hooks/useUserInfo';
import DlUserInfo, { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { MessagingProvider } from '@shared/hooks/useMessaging';

import { Navigation } from './Navigation';

export const dlUserInfoMock = {
  request: {
    query: DlUserInfo,
    variables: {
      // username: undefined,
    },
  },
  result: {
    data: {
      userInfo: {
        availableTasksCount: 636,
        availableTracksCount: 57,
        availableReportTypes: [
          'CAREER_REVIEW_SURVEY',
          'ASSESSMENT',
          'COLLEGE_AND_FUTURE',
          'OPPORTUNITIES',
          'CAREER_PATHWAY',
        ],
        algoliaSearchKey: 'abc',
        currentSchoolYear: 2024,
        hasAccessToCareers: true,
        logoUrl: null,
        iconUrl: null,
        permissions: {
          canBrowseReports: true,
        },
        hasUnreadConversation: false,
        entities: {
          nodes: [
            {
              settings: {
                classManagementEnabled: true,
                schoolYearStartDate: {
                  day: 1,
                  month: 7,
                },
              },
              uuid: '11111111-1111-1111-1111-111111111111',
            },
          ],
        },
        highlightedCatalogs: [],
        email: 'alonzorockteach@cleverdemo.com',
        firstName: 'Alonzo',
        lastName: 'Rockteach',
        role: 'TEACHER',
        standardSets: [
          {
            id: '14',
            name: 'Arkansas',
            setId: 'AR',
          },
        ],
        username: 'cleverteacher5',
        uuid: '12345678-1234-1234-1234-123456789012',
        id: '1221256',
        definedLearningUuid: '12345678-1234-1234-1234-123456789012',
        ltiDetails: {
          isLti: false,
          isLtiSearch: false,
          ltiContextId: '12345678-1234-1234-1234-123456789012',
          ltiConsumerKey: 'abc',
          ltiResourceLinkId: '1234413',
        },
        welcomeMessage: 'hello!',
      },
    },
  },
};

describe('Navigation', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[dlUserInfoMock]}>
        <MessagingProvider refreshUser={jest.fn()} userInfo={{} as TUserInfo}>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider value={{ userInfo: { ...dlUserInfoMock.result.data.userInfo } }}>
                <Navigation />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </MessagingProvider>
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('render correctly while teacher has no access to reports', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[dlUserInfoMock]}>
        <MessagingProvider refreshUser={jest.fn()} userInfo={{} as TUserInfo}>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider
                value={{
                  userInfo: {
                    ...dlUserInfoMock.result.data.userInfo,
                    permissions: { canBrowseReports: false },
                  },
                }}>
                <Navigation />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </MessagingProvider>
      </MockedProvider>
    );

    const reportsLink = screen.queryByRole('link', { name: 'Goals & Reports' });

    expect(reportsLink).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('render correctly while there is only Career Exploration report available', async () => {
    const { container } = renderWithRouterAndReduxProvider(
      <MockedProvider mocks={[dlUserInfoMock]}>
        <MessagingProvider refreshUser={jest.fn()} userInfo={{} as TUserInfo}>
          <PresentationStateProvider>
            <NavigationContextProvider>
              <UserInfoProvider
                value={{
                  userInfo: {
                    ...dlUserInfoMock.result.data.userInfo,
                    canBrowseReports: false,
                    availableReportTypes: [ReportTypes.CAREER_PATHWAY],
                  },
                }}>
                <Navigation />
              </UserInfoProvider>
            </NavigationContextProvider>
          </PresentationStateProvider>
        </MessagingProvider>
      </MockedProvider>
    );

    const reportsLink = await screen.findByRole('link', { name: 'Goals & Reports' });

    expect(reportsLink).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
