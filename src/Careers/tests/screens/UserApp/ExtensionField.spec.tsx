import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import GET_EXTENSION_FIELD from '@dc/graphql/user/queries/extensionField';
import UPDATE_EXTENSION_FIELD_STATUS from '@dc/graphql/user/mutations/updateExtensionFieldStatus';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';
import ExtensionFieldScreen from '@dc/screens/UserApp/Extension/Extension';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const defaultMocks = [
  {
    request: {
      query: GET_EXTENSION_FIELD,
      variables: { id: '1' },
    },
    result() {
      return {
        data: {
          extensionField: {
            archivedAt: null,
            author: {
              email: 'test@example.com',
              firstName: 'Patrick',
              lastName: 'Sawayn',
              username: 'test-user',
              uuid: 'c6a7dfa3-3cdd-4136-a5e1-1234fe20806f',
              __typename: 'User',
            },
            clusters: [
              {
                id: '1',
                name: 'Test cluster',
              },
              {
                id: '2',
                name: 'Test cluster 2',
              },
              {
                id: '3',
                name: 'Test cluster 3',
              },
            ],
            courses: [
              {
                id: '1',
                name: 'Test course',
              },
              {
                id: '2',
                name: 'Test course 2',
              },
              {
                id: '3',
                name: 'Test course 3',
              },
            ],
            description: 'Test description',
            files: [
              {
                id: '1',
                filename: 'test.pdf',
                url: 'https://example.com/test.pdf',
              },
              {
                id: '2',
                filename: 'test.pdf',
                url: 'https://example.com/test.pdf',
              },
            ],
            id: '1',
            imageUrl: null,
            links: [
              {
                name: 'Test link',
                url: 'https://example.com',
              },
              {
                name: 'Test link 2',
                url: 'https://example.com',
              },
              {
                name: 'Test link 3',
                url: 'https://example.com',
              },
            ],
            name: 'Test name',
            pathways: [
              {
                id: '1',
                name: 'Test pathway',
              },
              {
                id: '2',
                name: 'Test pathway 2',
              },
              {
                id: '3',
                name: 'Test pathway 3',
              },
            ],
            publishedFrom: null,
            publishedTo: null,
            status: 'DRAFT',
            __typename: 'ExtensionField',
          },
        },
      };
    },
  },
];

const mockWithDetails = {
  request: {
    query: GET_EXTENSION_FIELD,
    variables: { id: '1' },
  },
  result() {
    return {
      data: {
        extensionField: {
          archivedAt: null,
          author: {
            email: 'test@example.com',
            firstName: 'Patrick',
            lastName: 'Sawayn',
            username: 'test-user',
            uuid: 'c6a7dfa3-3cdd-4136-a5e1-1234fe20806f',
            __typename: 'User',
          },
          clusters: [
            {
              id: '1',
              name: 'Test cluster',
            },
            {
              id: '2',
              name: 'Test cluster 2',
            },
            {
              id: '3',
              name: 'Test cluster 3',
            },
          ],
          courses: [
            {
              id: '1',
              name: 'Test course',
            },
            {
              id: '2',
              name: 'Test course 2',
            },
            {
              id: '3',
              name: 'Test course 3',
            },
          ],
          description: 'Test description',
          files: [
            {
              id: '1',
              filename: 'test.pdf',
              url: 'https://example.com/test.pdf',
            },
            {
              id: '2',
              filename: 'test.pdf',
              url: 'https://example.com/test.pdf',
            },
          ],
          id: '1',
          imageUrl: null,
          links: [
            {
              name: 'Test link',
              url: 'https://example.com',
            },
            {
              name: 'Test link 2',
              url: 'https://example.com',
            },
            {
              name: 'Test link 3',
              url: 'https://example.com',
            },
          ],
          name: 'Test name',
          pathways: [
            {
              id: '1',
              name: 'Test pathway',
            },
            {
              id: '2',
              name: 'Test pathway 2',
            },
            {
              id: '3',
              name: 'Test pathway 3',
            },
          ],
          publishedFrom: '2022-02-25T14:16:13Z',
          publishedTo: '2022-02-26T14:16:13Z',
          status: 'PUBLISHED',
          __typename: 'ExtensionField',
        },
      },
    };
  },
};

const mockWithDetailsNotPublished = {
  request: {
    query: GET_EXTENSION_FIELD,
    variables: { id: '1' },
  },
  result() {
    return {
      data: {
        extensionField: {
          archivedAt: null,
          author: {
            email: 'test@example.com',
            firstName: 'Patrick',
            lastName: 'Sawayn',
            username: 'test-user',
            uuid: 'c6a7dfa3-3cdd-4136-a5e1-1234fe20806f',
            __typename: 'User',
          },
          clusters: [
            {
              id: '1',
              name: 'Test cluster',
            },
            {
              id: '2',
              name: 'Test cluster 2',
            },
            {
              id: '3',
              name: 'Test cluster 3',
            },
          ],
          courses: [
            {
              id: '1',
              name: 'Test course',
            },
            {
              id: '2',
              name: 'Test course 2',
            },
            {
              id: '3',
              name: 'Test course 3',
            },
          ],
          description: 'Test description',
          files: [
            {
              id: '1',
              filename: 'test.pdf',
              url: 'https://example.com/test.pdf',
            },
            {
              id: '2',
              filename: 'test.pdf',
              url: 'https://example.com/test.pdf',
            },
          ],
          id: '1',
          imageUrl: null,
          links: [
            {
              name: 'Test link',
              url: 'https://example.com',
            },
            {
              name: 'Test link 2',
              url: 'https://example.com',
            },
            {
              name: 'Test link 3',
              url: 'https://example.com',
            },
          ],
          name: 'Test name',
          pathways: [
            {
              id: '1',
              name: 'Test pathway',
            },
            {
              id: '2',
              name: 'Test pathway 2',
            },
            {
              id: '3',
              name: 'Test pathway 3',
            },
          ],
          publishedFrom: '2022-02-25T14:16:13Z',
          publishedTo: '2022-02-26T14:16:13Z',
          status: 'PUBLISHED',
          __typename: 'ExtensionField',
        },
      },
    };
  },
};

const renderExtensionField = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...mocks, ...defaultMocks]}>
      <UserInfoProvider
        value={{ userInfo: { ...userInfoMock.result.data.userInfo, role: Roles.SYSTEM_ADMIN } }}>
        <NavigationContextProvider>
          <Route path='/route/:id'>
            <div id='portal' />
            <ExtensionFieldScreen />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { route: '/route/1' }
  );

describe('UserExtensionFields', () => {
  describe('main', () => {
    it('renders main info', async () => {
      renderExtensionField();

      expect(await screen.findByText('Test name')).toBeInTheDocument();
      expect(screen.getByText('test-user')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Links')).toBeInTheDocument();
      expect(
        within(screen.getByRole('list', { name: 'Links' })).getAllByRole('listitem')
      ).toHaveLength(3);
      expect(
        within(screen.getByRole('list', { name: 'Attached Files' })).getAllByRole('listitem')
      ).toHaveLength(2);
    });
  });
  describe('settings panel', () => {
    it('renders settings panel with publication settings when no details are provided', async () => {
      renderExtensionField();

      expect(await screen.findByText('Extension Settings')).toBeInTheDocument();

      //data
      expect(screen.getByText('DRAFT')).toBeInTheDocument();
      expect(
        screen.getByText('There is no publication data. Click below to publish the extension.')
      ).toBeInTheDocument();

      //buttons
      expect(screen.getByRole('button', { name: 'Publish Extension' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit Extension' })).toBeInTheDocument();
    });

    it('renders settings panel with publication settings with details provided', async () => {
      renderExtensionField([mockWithDetails]);

      expect(await screen.findByText('Extension Settings')).toBeInTheDocument();

      //data
      expect(screen.getByText('PUBLISHED')).toBeInTheDocument();
      expect(
        screen.queryByText('There is no publication data. Click below to publish the extension.')
      ).not.toBeInTheDocument();
      expect(screen.getByText(/02.25.2022/)).toBeInTheDocument();
      expect(screen.getByText(/02.26.2022/)).toBeInTheDocument();
      //published in
      expect(screen.getByText('Test cluster')).toBeInTheDocument();
      expect(screen.getByText('Test cluster 2')).toBeInTheDocument();
      expect(screen.getByText('Test cluster 3')).toBeInTheDocument();
      expect(screen.getByText('Test pathway')).toBeInTheDocument();
      expect(screen.getByText('Test pathway 2')).toBeInTheDocument();
      expect(screen.getByText('Test pathway 3')).toBeInTheDocument();
      expect(screen.getByText('Test course')).toBeInTheDocument();
      expect(screen.getByText('Test course 2')).toBeInTheDocument();
      expect(screen.getByText('Test course 3')).toBeInTheDocument();

      //buttons
      expect(screen.getByRole('button', { name: 'Unpublish' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Publish Extension' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Publication Settings' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit Extension' })).toBeInTheDocument();
    });

    it('render dialog when edit settings are clicked', async () => {
      renderExtensionField([mockWithDetails]);

      expect(await screen.findByText('Extension Settings')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Edit Extension' }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
    it('Sends proper mutation on Unpublish (convert to draft)', async () => {
      let updateToDraft = jest.fn();
      const mutation = {
        request: {
          query: UPDATE_EXTENSION_FIELD_STATUS,
          variables: {
            input: {
              id: '1',
              status: 'DRAFT',
            },
          },
        },
        result: () => {
          updateToDraft();

          return {
            data: {
              updateExtensionField: {
                extensionField: {
                  id: '1',
                  status: 'draft',
                },
              },
            },
          };
        },
      };
      renderExtensionField([mockWithDetails, mutation]);

      expect(await screen.findByText('Extension Settings')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Unpublish' }));

      await waitFor(() => {
        expect(updateToDraft).toHaveBeenCalledTimes(1);
      });
    });
    it('Sends proper mutation on Publish', async () => {
      let updateToPublished = jest.fn();
      const mutation = {
        request: {
          query: UPDATE_EXTENSION_FIELD_STATUS,
          variables: {
            input: {
              id: '1',
              status: 'PUBLISHED',
            },
          },
        },
        result: () => {
          updateToPublished();

          return {
            data: {
              updateExtensionField: {
                extensionField: {
                  id: '1',
                  status: 'draft',
                },
              },
            },
          };
        },
      };
      renderExtensionField([mockWithDetailsNotPublished, mutation]);

      expect(await screen.findByText('Extension Settings')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Edit Extension' }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });
});
