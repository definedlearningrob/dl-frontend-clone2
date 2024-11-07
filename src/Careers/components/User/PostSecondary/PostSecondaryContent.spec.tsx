import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PostSecondaryContent } from '@dc/components/User/PostSecondary/PostSecondaryContent';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { SYNC_STATUS } from '@dc/resources/enums';
import { COUNSELORS } from '@dc/graphql/user/queries/counselors';

const getAllCounselorsFetchSpy = jest.fn();

const getAllCounselorsMock = {
  request: {
    query: COUNSELORS,
    variables: { perPage: 100 },
  },
  result() {
    getAllCounselorsFetchSpy();

    return {
      data: {
        counselors: {
          pagesCount: 1,
          nodesCount: 2,
          nodes: [
            {
              firstName: 'Cindy',
              fullName: 'Cindy Admino',
              lastName: 'Admino',
              uuid: 'b6f5217c-451a-4745-96ff-7aa54ba970a8',
              __typename: 'User',
            },
            {
              firstName: 'Bruce',
              fullName: 'Bruce Wayne',
              lastName: 'Wayne',
              uuid: 'b6f5217c-451a-4745-96ff-7aa54ba970a8',
              __typename: 'User',
            },
            {
              firstName: 'John',
              fullName: 'John Doe',
              lastName: 'Doe',
              uuid: 'b6f5217c-451a-4745-96ff-7aa54ba970a8',
            },
            {
              firstName: 'Jane',
              fullName: 'Jane Doe',
              lastName: 'Doe',
              uuid: 'b6f5217c-451a-4745-96ff-7aa54ba970a8',
            },
          ],
        },
      },
    };
  },
};

const renderPostSecondaryContent = (userInfoOverride: Partial<TUserInfo> = {}) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[getAllCounselorsMock]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
            ...userInfoOverride,
          },
        }}>
        <Route path='/post-secondary'>
          <PostSecondaryContent />
        </Route>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/post-secondary' }
  );

describe('PostSecondaryContent', () => {
  it('should render correctly', async () => {
    const { container } = renderPostSecondaryContent();
    const searchTile = await screen.findByText('Postsecondary Search');

    expect(searchTile).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render Common App Requests Post Secondary Impersonate counselor tile', async () => {
    renderPostSecondaryContent({
      firstName: 'Jack',
      lastName: 'Sparrow',
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: false,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus: {
          lastSyncedAt: '2022-03-11T15:00:00.000Z',
          status: SYNC_STATUS.COMPLETED,
        },
      },
      entities: {
        nodes: [
          {
            uuid: 'entityuuid',
            settings: {
              classManagementEnabled: false,
              postSecondaryApplicationsEnabled: true,
              schoolYearStartDate: {
                day: 1,
                month: 9,
              },
            },
            reportTypes: [],
          },
        ],
      },
      permissions: {
        counselor: true,
        wblAdmin: false,
        canImpersonate: true,
        canBrowseReports: false,
      },
    });

    const commonAppRequestsTile = await screen.findByText('Common App Requests');
    const impersonateCounselorTile = await screen.findByText('Login as Counselor');
    const postSecondarySearchTile = await screen.findByText('Postsecondary Search');

    expect(postSecondarySearchTile).toBeInTheDocument();
    expect(impersonateCounselorTile).toBeInTheDocument();
    expect(commonAppRequestsTile).toBeInTheDocument();
  });

  it('should allow to impersonate a counselor', async () => {
    renderPostSecondaryContent({
      firstName: 'Jack',
      lastName: 'Sparrow',
      commonAppData: {
        hasRecommenderInvitation: true,
        hasTeacherInvitation: false,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus: {
          lastSyncedAt: '2022-03-11T15:00:00.000Z',
          status: SYNC_STATUS.COMPLETED,
        },
      },
      permissions: {
        counselor: true,
        wblAdmin: false,
        canImpersonate: true,
        canBrowseReports: false,
      },
    });

    const impersonateCounselorTile = await screen.findByText('Login as Counselor');
    userEvent.click(impersonateCounselorTile);

    await waitFor(() => {
      expect(getAllCounselorsFetchSpy).toHaveBeenCalled();
    });

    const impersonateModal = await screen.findByRole('dialog');

    expect(impersonateModal).toHaveTextContent('Select counselor you want to login as');
    expect(impersonateModal).toHaveTextContent(
      'Select the counselor you want to login as so you can manage their content in Postsecondary'
    );
    const dropDownList = await screen.findByRole('combobox');
    userEvent.click(dropDownList);

    expect(await screen.findByText('Cindy Admino')).toBeInTheDocument();
  });

  it('should display disabled Common App Requests tile when counselor has no invitations', async () => {
    const { container } = renderPostSecondaryContent({
      commonAppData: {
        hasRecommenderInvitation: false,
        hasTeacherInvitation: false,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus: {
          lastSyncedAt: '2022-03-11T15:00:00.000Z',
          status: SYNC_STATUS.COMPLETED,
        },
      },
      entities: {
        nodes: [
          {
            uuid: 'entityuuid',
            settings: {
              classManagementEnabled: false,
              postSecondaryApplicationsEnabled: true,
              schoolYearStartDate: {
                day: 1,
                month: 9,
              },
            },
            reportTypes: [],
          },
        ],
      },
      permissions: {
        counselor: true,
        wblAdmin: false,
        canImpersonate: false,
        canBrowseReports: false,
      },
    });

    const commonAppRequestsTile = await screen.findByRole('link', {
      name: 'Locked Common App Requests',
    });

    expect(commonAppRequestsTile).toHaveAttribute('aria-disabled', 'true');
    expect(commonAppRequestsTile).toHaveClass('pointer-events-none');
    expect(
      screen.getByText(
        'You currently have no Common App invites. The tile will be enabled when a student invites you.'
      )
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should not display common app requests tile when entity has no access to it', async () => {
    const { container } = renderPostSecondaryContent({
      commonAppData: {
        hasRecommenderInvitation: false,
        hasTeacherInvitation: false,
        hasCounselorInvitation: false,
        hasCounselorProfileFormCompleted: false,
        hasTeacherProfileFormCompleted: false,
        syncStatus: {
          lastSyncedAt: '2022-03-11T15:00:00.000Z',
          status: SYNC_STATUS.COMPLETED,
        },
      },
      permissions: {
        counselor: true,
        wblAdmin: false,
        canImpersonate: false,
        canBrowseReports: false,
      },
    });

    const postSecondarySearchTile = await screen.findByText('Postsecondary Search');

    expect(postSecondarySearchTile).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
