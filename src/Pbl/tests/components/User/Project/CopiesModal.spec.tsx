import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { waitFor, screen, within } from '@testing-library/react';

import UserProjectCopiesModal from '@pbl/components/User/Project/Copies/CopiesModal';
import PROJECT_COPIES from '@pbl/graphql/user/queries/projectCopies';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const modalDisplayName = 'Friendly Display Name';

let entryMockCalled = false;

const defaultMock = {
  request: {
    query: PROJECT_COPIES,
    variables: { id: undefined },
  },
  result: () => {
    entryMockCalled = true;

    return {
      data: {
        project: {
          copies: [
            {
              id: '2',
              copies: [],
              displayName: 'Project 2',
            },
            {
              id: '3',
              copies: [
                {
                  id: '5',
                  copies: [],
                  displayName: 'copy 5',
                },
                {
                  id: '6',
                  copies: [],
                  displayName: 'copy 6',
                },
              ],
              displayName: 'Project 3',
            },
            {
              id: '4',
              copies: [
                {
                  id: '7',
                  copies: [
                    {
                      id: '8',
                      copies: [],
                      displayName: 'copy 8',
                    },
                  ],
                  displayName: 'copy 7',
                },
              ],
              displayName: 'Project 4',
            },
          ],
          id: '1',
        },
      },
    };
  },
};

const threeLevelDeepMock = {
  request: {
    query: PROJECT_COPIES,
    variables: { id: undefined },
  },
  result: () => ({
    data: {
      project: {
        copies: [
          {
            id: '4',
            copies: [
              {
                id: '7',
                copies: [
                  {
                    id: '8',
                    displayName: 'copy 8',
                  },
                ],
                displayName: 'copy 7',
              },
            ],
            displayName: 'Project 2',
          },
        ],
        id: '1',
      },
    },
  }),
};

const renderCopiesModal = (mock?: MockedResponse) => {
  const mocks = mock ? [mock, defaultMock] : [defaultMock];
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <NavigationContextProvider>
        <UserProjectCopiesModal displayName={modalDisplayName} isOpen={true} onDismiss={() => {}} />
      </NavigationContextProvider>
    </MockedProvider>
  );

  return { ...utils };
};
describe('UserCopiesModal', () => {
  describe('general', () => {
    it('renders spinner before loading content', async () => {
      renderCopiesModal();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(await screen.findByText(`${modalDisplayName} copies`)).toBeInTheDocument();
    });
    it('calls copies query on load', async () => {
      renderCopiesModal();

      await waitFor(() => expect(entryMockCalled).toBe(true));
    });
  });
  describe('logic', () => {
    it('renders 3 levels deep list with proper icons and order', async () => {
      renderCopiesModal(threeLevelDeepMock);

      expect(await screen.findAllByRole('list')).toHaveLength(3);
      expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Project 2');
      expect(within(screen.getAllByRole('listitem')[0]).queryAllByRole('list')).toHaveLength(2);

      expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('copy 7');
      expect(within(screen.getAllByRole('listitem')[1]).queryAllByRole('list')).toHaveLength(1);

      expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('copy 8');
      expect(within(screen.getAllByRole('listitem')[2]).queryAllByRole('list')).toHaveLength(0);
    });
    it('renders multi level list with proper icons and order', async () => {
      renderCopiesModal();

      expect(await screen.findAllByRole('list')).toHaveLength(4);
      expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Project 2');
      expect(within(screen.getAllByRole('listitem')[0]).queryAllByRole('list')).toHaveLength(0);

      expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Project 3');
      expect(within(screen.getAllByRole('listitem')[1]).queryAllByRole('list')).toHaveLength(1);
      expect(within(screen.getAllByRole('listitem')[1]).queryAllByRole('listitem')).toHaveLength(2);

      expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('copy 5');
      expect(within(screen.getAllByRole('listitem')[2]).queryAllByRole('list')).toHaveLength(0);
      expect(within(screen.getAllByRole('listitem')[2]).queryAllByRole('listitem')).toHaveLength(0);

      expect(screen.getAllByRole('listitem')[3]).toHaveTextContent('copy 6');
      expect(within(screen.getAllByRole('listitem')[3]).queryAllByRole('list')).toHaveLength(0);
      expect(within(screen.getAllByRole('listitem')[3]).queryAllByRole('listitem')).toHaveLength(0);

      expect(screen.getAllByRole('listitem')[4]).toHaveTextContent('Project 4');
      expect(within(screen.getAllByRole('listitem')[4]).queryAllByRole('list')).toHaveLength(2);
      expect(within(screen.getAllByRole('listitem')[4]).queryAllByRole('listitem')).toHaveLength(2);
    });
  });
});
