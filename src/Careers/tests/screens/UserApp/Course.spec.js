import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserCourse from '@dc/screens/UserApp/Course/Course';
import courseQuery from '@dc/graphql/user/queries/course';
import { COURSE_TYPES } from '@dc/resources/constants';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultMocks = [
  {
    request: {
      query: courseQuery,
      variables: {
        id: undefined,
        track: true,
      },
    },
    result: () => ({
      data: {
        course: {
          __typename: 'Course',
          badges: [],
          collection: { id: '1', name: 'Collection name' },
          description: 'some desc',
          displayName: 'First course',
          thumbnailUrl: 'thumbnail-url',
          metadata: null,
          archivedAt: null,
          id: '1',
          isGlobal: true,
          imageUrl: 'first-image-url',
          lessons: [],
          name: 'First course',
          status: 'draft',
          pathway: {
            id: '1',
            name: 'some pathway',
          },
          type: COURSE_TYPES.HIGH_SCHOOL,
          sharedResource: null,
        },
      },
    }),
  },
  userInfoMock,
];

const renderUserCourse = (isTeacherView, role) => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={defaultMocks}>
      <UserInfoProvider
        value={{
          userInfo: {
            role,
          },
        }}>
        <ExpandSidebarProvider>
          <NavigationContextProvider>
            <UserCourse teacherView={isTeacherView} />
          </NavigationContextProvider>
        </ExpandSidebarProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserAppCourse', () => {
  describe('when visited in Admin app', () => {
    it('does not show school class assign/unassign buttons', async () => {
      const { container } = renderUserCourse(false, Roles.ENTITY_ADMIN);

      await waitFor(() => {
        expect(container).toMatchSnapshot();
        expect(container).not.toHaveTextContent(/Assign To Class/i);
        expect(container).not.toHaveTextContent(/Unassign Class/i);
      });
    });
  });

  describe('when visited in User app', () => {
    it('renders with "Assign To Class" and "Unassign Class" buttons', async () => {
      const { container } = renderUserCourse(true, Roles.TEACHER);

      await waitFor(() => {
        expect(container).toHaveTextContent(/Assign To Class/i);
        expect(container).toHaveTextContent(/Unassign Class/i);
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('show button to create share link', () => {
    it('should have button for logged in teacher', async () => {
      const { container } = renderUserCourse(true, Roles.TEACHER);

      await waitFor(() => {
        expect(container).toHaveTextContent(/Create share link/i);
      });
    });

    it('should have button for logged in entity admin', async () => {
      const { container } = renderUserCourse(true, Roles.ENTITY_ADMIN);

      await waitFor(() => {
        expect(container).toHaveTextContent(/Create share link/i);
      });
    });

    it('should open modal to create share link', async () => {
      const { getByTestId } = renderUserCourse(true, Roles.TEACHER);

      await waitFor(() => {
        expect(getByTestId(/create-share-link/)).toBeInTheDocument();

        userEvent.click(getByTestId('create-share-link'));
      });

      await waitFor(() => {
        const shareLinkButton = getByTestId('share-link-button');

        expect(getByTestId(/allow-logins/)).toBeInTheDocument();
        expect(shareLinkButton).toBeInTheDocument();
      });
    });

    it('should hide button for sales admin', async () => {
      const { container } = renderUserCourse(false, Roles.SALES_ADMIN);

      await waitFor(() => {
        expect(container).not.toHaveTextContent(/Create share link/i);
      });
    });
  });
});
