// import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CREATE_EXTENSION_FIELD from '@dc/graphql/user/mutations/createExtensionField';
import GET_EXTENSION_FIELDS from '@dc/graphql/user/queries/extensionFields';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import UserExtensionFields from '@dc/screens/UserApp/Extensions/Extensions';
import { Roles } from '@dc/resources/enums';
import { userInfoMock } from '@dc/tests/mocks/userMocks';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          extensionFields: {
            merge: true,
          },
        },
      },
    },
  });

Element.prototype.getBoundingClientRect = () =>
  ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  } as any);

const defaultMocks = [
  {
    request: {
      query: GET_EXTENSION_FIELDS,
      variables: { filter: {}, page: 1, perPage: 15, scope: 'ACTIVE' },
    },
    result() {
      return {
        data: {
          extensionFields: {
            nodes: [
              {
                archivedAt: null,
                author: {
                  email: 'test@example.com',
                  firstName: 'Patrick',
                  lastName: 'Sawayn',
                  username: 'test-user',
                  uuid: 'c6a7dfa3-3cdd-4136-a5e1-1234fe20806f',
                  __typename: 'User',
                },
                clusters: [],
                courses: [],
                description: 'Test description',
                id: '1',
                imageUrl: null,
                name: 'Test name',
                pathways: [],
                publishedFrom: null,
                publishedTo: null,
                status: 'DRAFT',
                __typename: 'ExtensionField',
              },
              {
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
                ],
                courses: [
                  {
                    id: '1',
                    name: 'Test course',
                  },
                ],
                description: 'Test description 2',
                id: '2',
                imageUrl: null,
                name: 'Test name 2',
                pathways: [
                  {
                    id: '1',
                    name: 'Test pathway',
                  },
                ],
                publishedFrom: '2022-02-25T14:16:13Z',
                publishedTo: null,
                status: 'PUBLISHED',
                __typename: 'ExtensionField',
              },
              {
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
                description: 'Test description 3',
                id: '3',
                imageUrl: null,
                name: 'Test name 3',
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
            ],
            nodesCount: 2,
            pagesCount: 1,
            __typename: 'ExtensionFieldPage',
          },
        },
      };
    },
  },
  userInfoMock,
];

const renderExtensionFields = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider
        value={{ userInfo: { ...userInfoMock.result.data.userInfo, role: Roles.SYSTEM_ADMIN } }}>
        <NavigationContextProvider>
          <div id='portal' />
          <UserExtensionFields />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('UserExtensionFields', () => {
  describe('HEADER', () => {
    it('Displays header with add button & lists extensions', async () => {
      renderExtensionFields();
      expect(await screen.findByText('Extensions')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'New Extension' })).toBeInTheDocument();
      expect(await screen.findByText('Test name')).toBeInTheDocument();
      expect(screen.getByText('Test name 2')).toBeInTheDocument();
    });
    it('renders extension create modal after click', async () => {
      renderExtensionFields();

      expect(await screen.findByText('Extensions')).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'New Extension' }));

      expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });
    it.skip('sends mutation after properly filling data', async () => {
      let createExtensionSpy = jest.fn();
      const mutation = {
        request: {
          query: CREATE_EXTENSION_FIELD,
          variables: {
            input: {
              name: 'Test extension',
              description: '<p>Test extension</p>',
              links: [],
              status: 'DRAFT',
            },
          },
        },
        result: () => {
          createExtensionSpy();

          return {
            data: {
              createExtensionField: {
                extensionField: {
                  id: '1',
                  name: 'test',
                  description: 'test',
                },
              },
            },
          };
        },
      };

      renderExtensionFields([mutation]);

      expect(await screen.findByText('Extensions')).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'New Extension' }));

      expect(await screen.findByRole('dialog')).toBeInTheDocument();
      await userEvent.paste(screen.getByLabelText('Extension Name'), 'Test extension');
      await userEvent.paste(
        screen.getByRole('textbox', { name: '', hidden: true }),
        'Test extension'
      );
      await waitFor(() => {
        userEvent.click(screen.getByRole('button', { name: 'Create Extension' }));
      });

      await waitFor(() => {
        expect(createExtensionSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('LIST', () => {
    it('Displays placeholder when there is no date', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const firstExtension = extensionFields[0];

      expect(within(firstExtension).getByText(/Date has not been set/)).toBeInTheDocument();
    });

    it('Displays placeholder when there is no end date', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const secondExtension = extensionFields[1];

      expect(within(secondExtension).getByText(/Date not set/)).toBeInTheDocument();
    });

    it('Displays full date when provided both values', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const thirdExtension = extensionFields[2];

      expect(within(thirdExtension).getByText(/02.25.2022/)).toBeInTheDocument();
      expect(within(thirdExtension).getByText(/02.26.2022/)).toBeInTheDocument();
    });

    it('Displays placeholder when item is not assigned to anything', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const firstExtension = extensionFields[0];

      expect(within(firstExtension).getByText(/Not published in any resource/)).toBeInTheDocument();
    });
    it('Displays connected sources from clusters, courses and pathways in published in label', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const secondExtension = extensionFields[1];

      expect(within(secondExtension).getByText(/Test cluster/)).toBeInTheDocument();
      expect(within(secondExtension).getByText(/Test pathway/)).toBeInTheDocument();
      expect(within(secondExtension).getByText(/Test course/)).toBeInTheDocument();
    });
    it('Limits the published in label to 5 items and display show more button', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const secondExtension = extensionFields[2];

      expect(within(secondExtension).getByText('Test cluster')).toBeInTheDocument();
      expect(within(secondExtension).getByText('Test cluster 2')).toBeInTheDocument();
      expect(within(secondExtension).getByText('Test cluster 3')).toBeInTheDocument();
      expect(within(secondExtension).getByText('Test pathway')).toBeInTheDocument();
      expect(within(secondExtension).getByText('Test pathway 2')).toBeInTheDocument();
      expect(within(secondExtension).queryByText('Test pathway 3')).not.toBeInTheDocument();
      expect(
        within(secondExtension).getByRole('button', { name: 'Show more' })
      ).toBeInTheDocument();
    });
    it('opens show more modal after click and lists all the sources', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const secondExtension = extensionFields[2];

      userEvent.click(within(secondExtension).getByRole('button', { name: 'Show more' }));
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
      const modal = screen.getByRole('dialog');

      expect(within(modal).getByText(/Clusters/)).toBeInTheDocument();
      expect(within(modal).getByText('Test cluster')).toBeInTheDocument();
      expect(within(modal).getByText('Test cluster 2')).toBeInTheDocument();
      expect(within(modal).getByText('Test cluster 3')).toBeInTheDocument();
      expect(within(modal).getByText(/Pathways/)).toBeInTheDocument();
      expect(within(modal).getByText('Test pathway')).toBeInTheDocument();
      expect(within(modal).getByText('Test pathway 2')).toBeInTheDocument();
      expect(within(modal).getByText('Test pathway 3')).toBeInTheDocument();
      expect(within(modal).getByText(/Courses/)).toBeInTheDocument();
      expect(within(modal).getByText('Test course')).toBeInTheDocument();
      expect(within(modal).getByText('Test course 2')).toBeInTheDocument();
      expect(within(modal).getByText('Test course 3')).toBeInTheDocument();
    });
    it('Displays correct badge depending on status', async () => {
      renderExtensionFields();
      const extensionFields = await screen.findAllByRole('listitem');
      const firstExtension = extensionFields[0];
      const thirdExtension = extensionFields[2];

      expect(within(firstExtension).getByText('DRAFT')).toBeInTheDocument();
      expect(within(firstExtension).queryByText('PUBLISHED')).not.toBeInTheDocument();
      expect(within(thirdExtension).getByText('PUBLISHED')).toBeInTheDocument();
      expect(within(thirdExtension).queryByText('DRAFT')).not.toBeInTheDocument();
    });
  });
});
