import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import Contracts from '@dc/screens/AdminApp/Contracts/Contracts';
import contractsQuery from '@dc/graphql/user/queries/contracts';
import performContractsSyncMutation from '@dc/graphql/user/mutations/performContractsSync';
import performFullContractSyncMutation from '@dc/graphql/user/mutations/performFullContractSync';
import updateContractMutation from '@dc/graphql/user/mutations/updateContract';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

let performContractsSyncMutationCalled = false;
let performFullContractSyncMutationCalled = false;
let updateContractMutationCalled = false;

const mocks = [
  {
    request: {
      query: contractsQuery,
      variables: { filter: {}, page: 1, perPage: 10 },
    },
    result: {
      data: {
        contracts: {
          nodesCount: 3,
          pagesCount: 1,
          nodes: [
            {
              id: '1',
              definedLearningUuid: '1',
              name: 'First contract',
              startDate: '2020-01-01',
              endDate: '2020-02-01',
              syncable: true,
              entities: [
                { uuid: 1, name: 'first entity' },
                { uuid: 2, name: 'second entity' },
                { uuid: 3, name: 'third entity' },
              ],
              uuid: '1uuid',
            },
            {
              id: '2',
              definedLearningUuid: '2',
              name: 'Second contract',
              startDate: '2020-02-01',
              endDate: '2020-03-01',
              entities: [],
              syncable: false,
              uuid: '2uuid',
            },
            {
              id: '3',
              definedLearningUuid: '3',
              name: 'Third contract',
              startDate: '2020-03-01',
              endDate: '2020-04-01',
              entities: [],
              syncable: false,
              uuid: '3uuid',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: performContractsSyncMutation,
      variables: { input: {} },
    },
    result: () => {
      performContractsSyncMutationCalled = true;

      return {
        data: {
          performContractsSync: {
            status: 'queued',
          },
        },
      };
    },
  },
  {
    request: {
      query: performFullContractSyncMutation,
      variables: {
        input: {
          definedLearningContractUuid: '1',
        },
      },
    },
    result: () => {
      performFullContractSyncMutationCalled = true;

      return {
        data: {
          performFullContractSync: {
            status: 'queued',
          },
        },
      };
    },
  },
  {
    request: {
      query: updateContractMutation,
      variables: {
        input: {
          id: '1',
          syncable: false,
        },
      },
    },
    result: () => {
      updateContractMutationCalled = true;

      return {
        data: {
          updateContract: {
            contract: {
              id: '1',
              uuid: '1',
              syncable: false,
            },
          },
        },
      };
    },
  },
];

const renderAdminAppLessons = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Contracts />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppContracts', () => {
  beforeEach(() => {
    performContractsSyncMutationCalled = false;
    performFullContractSyncMutationCalled = false;
  });

  it('renders spinner before response is resolved', async () => {
    const { getByTestId } = renderAdminAppLessons();

    expect(getByTestId(/loading-spinner/)).toBeInTheDocument();

    await act(() => Promise.resolve({}));
  });

  it('renders lessons list correctly', async () => {
    const { getAllByTestId } = renderAdminAppLessons();

    await waitFor(() => {
      expect(getAllByTestId(/contracts-list-item$/i).length).toEqual(3);

      const contractsNames = getAllByTestId(/contract-name/);
      const contractsStartDates = getAllByTestId(/contract-startDate/);
      const contractsEndDates = getAllByTestId(/contract-endDate/);

      expect(contractsNames[0].textContent).toEqual('First contract');
      expect(contractsNames[1].textContent).toEqual('Second contract');
      expect(contractsNames[2].textContent).toEqual('Third contract');

      expect(contractsStartDates[0].textContent).toEqual('Jan 1, 2020');
      expect(contractsStartDates[1].textContent).toEqual('Feb 1, 2020');
      expect(contractsStartDates[2].textContent).toEqual('Mar 1, 2020');

      expect(contractsEndDates[0].textContent).toEqual('Feb 1, 2020');
      expect(contractsEndDates[1].textContent).toEqual('Mar 1, 2020');
      expect(contractsEndDates[2].textContent).toEqual('Apr 1, 2020');

      const contractsEntities = getAllByTestId(/contract-entity-item/);

      expect(contractsEntities.length).toEqual(3);
      expect(contractsEntities[0].textContent).toEqual('first entity');
      expect(contractsEntities[1].textContent).toEqual('second entity');
      expect(contractsEntities[2].textContent).toEqual('third entity');
    });
  });

  it('calls performFullContractSyncMutation on particular syncable contract sync', async () => {
    const { getAllByTestId } = renderAdminAppLessons();
    await act(() => Promise.resolve({}));

    expect(performFullContractSyncMutationCalled).toEqual(false);

    await waitFor(() => {
      const syncFirstContractButton = getAllByTestId(/contract-sync-button/)[0];
      fireEvent.click(syncFirstContractButton);
    });

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      expect(performFullContractSyncMutationCalled).toEqual(true);
    });
  });

  it('does not call performFullContractSyncMutation on particular unsyncable contract sync', async () => {
    const { getAllByTestId } = renderAdminAppLessons();
    await act(() => Promise.resolve({}));

    expect(performFullContractSyncMutationCalled).toEqual(false);

    await waitFor(() => {
      const syncFirstContractButton = getAllByTestId(/contract-sync-button/)[1];
      fireEvent.click(syncFirstContractButton);
    });

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      expect(performFullContractSyncMutationCalled).toEqual(false);
    });
  });

  it('calls performContractsSyncMutation on sync all contracts button', async () => {
    const { getByTestId } = renderAdminAppLessons();
    await act(() => Promise.resolve({}));

    expect(performContractsSyncMutationCalled).toEqual(false);

    await waitFor(() => {
      const syncAllContracts = getByTestId(/contracts-sync-all-button/);
      fireEvent.click(syncAllContracts);
    });

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      expect(performContractsSyncMutationCalled).toEqual(true);
    });
  });

  it('calls updateContractMutation on switch click with proper param', async () => {
    renderAdminAppLessons();

    expect(updateContractMutationCalled).toEqual(false);

    await waitFor(() => {
      const switchButton = screen.getAllByRole('switch')[0];
      fireEvent.click(switchButton);
    });

    await waitFor(() => {
      expect(updateContractMutationCalled).toEqual(true);
    });
  });
});
