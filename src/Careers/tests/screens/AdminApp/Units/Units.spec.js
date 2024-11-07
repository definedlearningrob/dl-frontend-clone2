/* eslint-disable max-len */
import { act } from 'react-dom/test-utils';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AdminAppUnits from '@dc/screens/AdminApp/Units/Units';
import archiveUnitMutation from '@dc/graphql/user/mutations/archiveUnit';
import { UNITS } from '@dc/graphql/user/queries/units';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

import { SERVICE_NAME } from '@shared/resources/enums';

let archiveUnitCalled = false;
let refetchUnitsCalled = false;

const mocks = [
  {
    request: {
      query: UNITS,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        units: {
          nodes: [
            {
              archivedAt: null,
              description: 'New unit #1 description',
              service: SERVICE_NAME.CAREERS,
              displayName: null,
              id: '11',
              imageUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/units/05d3b594-3079-48e7-8e1e-89ce65cd3fdc/ecopetit.cat-ultrawide-wallpaper-275849.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20210323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210323T122900Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=e225ae39764a35f9e0c9706f15eea6861480b20df47a5158ad0101d7adf00094',
              name: 'New unit #1',
              status: 'TEST',
              thumbnailUrl: 'some-thumbnail-url',
              tasks: [
                {
                  id: '1',
                  name: '',
                  step: 1,
                },
              ],
              __typename: 'Unit',
            },
            {
              archivedAt: null,
              description: 'New unit #2 description',
              displayName: null,
              service: SERVICE_NAME.CAREERS,
              id: '12',
              imageUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/units/5e1e6ee7-866f-4845-b124-deb74bd4cd27/action-america-architecture-378570.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20210323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210323T122900Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=71d00b503534de3a258e62a6618d1fd6e7bf0054ebf8fdb7626126f4be96a802',
              name: 'New unit #2',
              status: 'TEST',
              thumbnailUrl: 'some-thumbnail-url',
              tasks: [
                {
                  id: '1',
                  name: '',
                  step: 1,
                },
              ],
              __typename: 'Unit',
            },
            {
              archivedAt: null,
              description: 'New unit #3 description',
              service: SERVICE_NAME.CAREERS,
              displayName: null,
              id: '13',
              imageUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/units/a9dd2607-9661-418f-b65c-7b1e9ea3ad01/shopify-pros.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20210323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210323T122900Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=5c625cdc84bfd7208a398b14cfd8de607cd72778f4d180c7bbd4b7cd605a1bc6',
              name: 'New unit #3',
              status: 'TEST',
              thumbnailUrl: 'some-thumbnail-url',
              tasks: [
                {
                  id: '1',
                  name: '',
                  step: 1,
                },
              ],
              __typename: 'Unit',
            },
          ],
          pagesCount: 1,
          nodesCount: 3,
        },
      },
    },
  },
  {
    request: {
      query: UNITS,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: () => {
      refetchUnitsCalled = true;

      return {
        data: {
          units: {
            pagesCount: 1,
            nodesCount: 3,
            nodes: [],
          },
        },
      };
    },
  },
  {
    request: {
      query: archiveUnitMutation,
      variables: {
        input: {
          id: '11',
        },
      },
    },
    result: () => {
      archiveUnitCalled = true;

      return {
        data: {
          archiveUnit: {
            unit: {
              id: '11',
              archivedAt: null,
              description: '',
              imageUrl: '',
              name: '',
            },
          },
        },
      };
    },
  },
];

const renderAdminAppUnits = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <AdminAppUnits />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppUnits', () => {
  it('renders spinner before response is resolved', async () => {
    renderAdminAppUnits();

    expect(screen.getByTestId(/loading-spinner/)).toBeInTheDocument();

    await act(() => Promise.resolve());
  });

  it('renders units list correctly', async () => {
    renderAdminAppUnits();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getAllByTestId(/units-list-item$/i).length).toEqual(3);

      const unitsNames = screen.getAllByTestId(/units-list-item-name/);

      expect(unitsNames[0].textContent).toEqual('New unit #1');
      expect(unitsNames[1].textContent).toEqual('New unit #2');
      expect(unitsNames[2].textContent).toEqual('New unit #3');
    });
  });

  it('opens archive modal on archive click', async () => {
    renderAdminAppUnits();

    await act(async () => {
      await new Promise((resolve) => resolve({}));
    });

    await waitFor(() => {
      const firstUnitArchiveButton = screen.getAllByLabelText(/Archive/i);
      fireEvent.click(firstUnitArchiveButton[0]);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(screen.getByTestId(/modal-header/)).toHaveTextContent('Archiving unit');
  });

  it('closes archive modal on archive modal cancel click', async () => {
    renderAdminAppUnits();

    await act(async () => {
      await new Promise((resolve) => resolve({}));
    });
    await waitFor(() => {
      const firstUnitArchiveButton = screen.getAllByLabelText(/Archive/i)[0];
      fireEvent.click(firstUnitArchiveButton);
    });

    await act(() => Promise.resolve({}));
    await fireEvent.click(screen.getByTestId(/archive-modal-cancel/));
    await act(() => Promise.resolve({}));

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls archive unit on archive modal accept and refetches data for current scope', async () => {
    renderAdminAppUnits();

    await act(async () => {
      await new Promise((resolve) => resolve({}));
    });

    await waitFor(() => {
      const firstUnitArchiveButton = screen.getAllByLabelText(/Archive/i)[0];
      fireEvent.click(firstUnitArchiveButton);
    });

    const firstUnitArchiveButton = screen.getAllByLabelText(/Archive/i)[0];

    act(() => {
      fireEvent.click(firstUnitArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(archiveUnitCalled).toBe(false);
    expect(refetchUnitsCalled).toBe(false);

    act(() => {
      fireEvent.click(screen.getByTestId(/archive-modal-accept/));
    });

    await waitFor(() => {
      expect(archiveUnitCalled).toBe(true);
      expect(refetchUnitsCalled).toBe(true);

      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });
  });
});
