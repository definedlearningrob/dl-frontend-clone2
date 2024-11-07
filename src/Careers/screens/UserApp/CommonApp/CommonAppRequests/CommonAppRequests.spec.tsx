import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { CommonAppRequestsScreen } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/CommonAppRequestsScreen';
import { RECOMMENDATION_REQUESTS_QUERY } from '@dc/graphql/user/queries/recommendationRequests';
import cacheConfig from '@dc/graphql/cacheConfig';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { SYNC_STATUS } from '@dc/resources/enums';

const commonAppRecommendationsResponse = {
  data: {
    recommendationRequests: {
      nodesCount: 2,
      pagesCount: 1,
      nodes: [
        {
          applicant: {
            firstName: 'John',
            lastName: 'Doe',
            uuid: '0123',
            applicantId: '1',
            email: 'johndoe@test.org',
          },
          deadline: '',
          submittedFormsCount: 0,
          totalFormsCount: 2,
        },
        {
          applicant: {
            firstName: 'Jane',
            lastName: 'Doe',
            uuid: '0124',
            applicantId: '2',
            email: 'johedoe@test.org',
          },
          deadline: '',
          submittedFormsCount: 1,
          totalFormsCount: 4,
        },
      ],
    },
  },
};

const commonAppRecommendationsMock = {
  request: {
    query: RECOMMENDATION_REQUESTS_QUERY,
    variables: {
      page: 1,
      perPage: 20,
    },
  },
  result: commonAppRecommendationsResponse,
};

const mocks = [commonAppRecommendationsMock];

const syncStatus = {
  lastSyncedAt: '2021-08-09T12:00:00.000Z',
  status: SYNC_STATUS.COMPLETED,
};

const defaultCommonAppData = {
  commonAppData: {
    hasRecommenderInvitation: true,
    hasTeacherInvitation: false,
    hasCounselorInvitation: false,
    hasCounselorProfileFormCompleted: false,
    hasTeacherProfileFormCompleted: false,
    syncStatus,
  },
};

const renderComponentCardWithProvider = (commonAppData = defaultCommonAppData) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={cacheConfig} mocks={mocks}>
      <Route path='/post-secondary/commonapp-requests'>
        <UserInfoProvider
          value={{ userInfo: { ...userInfoMock.result.data.userInfo, ...commonAppData } }}>
          <CommonAppRequestsScreen />
        </UserInfoProvider>
      </Route>
    </MockedProvider>,
    { route: '/post-secondary/commonapp-requests' }
  );

describe('CommonAppRequest counselor and teacher profile forms', () => {
  it('should render skeletons when has only RecommenderInvitation', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: false,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    const { container } = renderComponentCardWithProvider(commonAppData);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render component for fill up counselor profile from when hasCounselorInvitation', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: false,
        hasCounselorInvitation: true,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);

    const completeCounselorProfile = await screen.findByRole('button', {
      name: 'Complete counselor form',
    });

    expect(completeCounselorProfile).toBeInTheDocument();
  });

  it('should render component for fill up teacher  from when hasTeacherInvitation', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: true,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);

    const completeTeacherProfile = await screen.findByRole('button', {
      name: 'Complete teacher form',
    });

    expect(completeTeacherProfile).toBeInTheDocument();
  });

  it('should render both components for fillUp from when hasTeacherInvitation and hasCounselorInvitation', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: true,
        hasCounselorInvitation: true,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);

    const completeCounselorProfile = await screen.findByRole('button', {
      name: 'Complete counselor form',
    });

    const completeTeacherProfile = await screen.findByRole('button', {
      name: 'Complete teacher form',
    });

    expect(completeCounselorProfile).toBeInTheDocument();
    expect(completeTeacherProfile).toBeInTheDocument();
  });

  it('should render data counselor profile is completed', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: true,
        hasCounselorInvitation: true,
        hasCounselorProfileFormCompleted: true,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);

    await waitFor(() => {
      const headerElement = screen.getByText('You have completed your counselor profile');
      expect(headerElement).toBeInTheDocument();
    });
  });

  it('should render data teacher profile is completed', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: true,
        hasCounselorInvitation: true,
        hasCounselorProfileFormCompleted: true,
        hasTeacherProfileFormCompleted: false,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);
    const editProfile = await screen.findByRole('link', {
      name: /Edit Profile/i,
    });

    const headerElementCounselor = screen.getByText('You have completed your counselor profile');
    expect(headerElementCounselor).toBeInTheDocument();
    expect(editProfile).toBeInTheDocument();
    expect(editProfile).toHaveAttribute('href', '/forms/counselorprofile');
  });

  it('should render data when teacher and counselor profiles are completed', async () => {
    const commonAppData = {
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: true,
        hasCounselorInvitation: true,
        hasCounselorProfileFormCompleted: true,
        hasTeacherProfileFormCompleted: true,
        syncStatus,
      },
    };

    renderComponentCardWithProvider(commonAppData);

    const editProfiles = await screen.findByRole('button', {
      name: 'Edit',
    });

    await waitFor(() => {
      const headerElementCounselor = screen.getByText(
        'You have completed your Counselor and teacher profile.'
      );
      expect(headerElementCounselor).toBeInTheDocument();
      expect(editProfiles).toBeInTheDocument();
    });
  });
});
