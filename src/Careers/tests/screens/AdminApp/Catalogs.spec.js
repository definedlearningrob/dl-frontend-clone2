import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import archiveCatalogMutation from '@dc/graphql/user/mutations/archiveCatalog';
import Catalogs from '@dc/screens/AdminApp/Catalogs/Catalogs';
import catalogsQuery from '@dc/graphql/user/queries/catalogs';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

let archiveCatalogCalled = false;
let refetchCatalogsCalled = false;

const mocks = [
  {
    request: {
      query: catalogsQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        catalogs: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              archivedAt: null,
              description: 'Catalog Description',
              displayName: 'Catalog Display Name',
              id: '1',
              imageUrl: 'first-image-url',
              thumbnailUrl: 'some-thumbnail-url',
              tracks: [],
              name: 'First catalog',
              status: 'draft',
              __typename: 'Catalog',
              service: 'CAREERS',
            },
            {
              archivedAt: null,
              description: 'Catalog Description',
              displayName: 'Catalog Display Name',
              id: '2',
              imageUrl: 'second-image-url',
              thumbnailUrl: 'some-thumbnail-url',
              tracks: [],
              name: 'Second catalog',
              status: 'draft',
              __typename: 'Catalog',
              service: 'CAREERS',
            },
            {
              archivedAt: null,
              description: 'Catalog Description',
              displayName: 'Catalog Display Name',
              id: '3',
              imageUrl: 'third-image-url',
              thumbnailUrl: 'some-thumbnail-url',
              tracks: [],
              name: 'Third catalog',
              pathway: {
                name: 'some pathway',
                id: '1',
              },
              status: 'draft',
              __typename: 'Catalog',
              service: 'CAREERS',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: catalogsQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: () => {
      refetchCatalogsCalled = true;

      return {
        data: {
          catalogs: {
            pagesCount: 0,
            nodesCount: 0,
            nodes: [],
          },
        },
      };
    },
  },
  {
    request: {
      query: archiveCatalogMutation,
      variables: {
        input: {
          id: '1',
        },
      },
    },
    result: () => {
      archiveCatalogCalled = true;

      return {
        data: {
          archiveCatalog: {
            catalog: {
              id: '1',
              archivedAt: null,
            },
          },
        },
      };
    },
  },
];

const renderAdminAppCatalogs = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Catalogs />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppCatalogs', () => {
  beforeEach(() => {
    archiveCatalogCalled = false;
    refetchCatalogsCalled = false;
  });

  it('renders spinner before response is resolved', async () => {
    renderAdminAppCatalogs();
    const loaderSpinner = screen.getByTestId('loading-spinner');
    expect(loaderSpinner).toBeInTheDocument();

    await act(() => Promise.resolve());
  });

  it('renders catalogs list correctly', async () => {
    renderAdminAppCatalogs();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const catalogList = screen.getAllByTestId('catalogs-list-item');
    expect(catalogList.length).toEqual(3);

    const catalogNames = screen.getAllByTestId(/catalogs-list-item-name/);
    expect(catalogNames[0].textContent).toEqual('First catalog');
    expect(catalogNames[1].textContent).toEqual('Second catalog');
    expect(catalogNames[2].textContent).toEqual('Third catalog');
  });

  it('opens archive modal on archive click', async () => {
    renderAdminAppCatalogs();

    await waitFor(() => {
      const firstCatalogArchiveButton = screen.getAllByLabelText(/Archive/)[0];
      fireEvent.click(firstCatalogArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

    const archiveModal = screen.getByTestId('modal-header');

    expect(archiveModal).toHaveTextContent('Archiving catalog');
  });

  it('closes archive modal on archive modal cancel click', async () => {
    renderAdminAppCatalogs();

    await waitFor(() => {
      const firstCatalogArchiveButton = screen.getAllByLabelText(/Archive/)[0];
      fireEvent.click(firstCatalogArchiveButton);
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId(/archive-modal-cancel/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls archive catalog on archive modal accept and refetches data for current scope', async () => {
    renderAdminAppCatalogs();

    await waitFor(() => {
      const firstCatalogArchiveButton = screen.getAllByLabelText(/Archive/)[0];
      fireEvent.click(firstCatalogArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(archiveCatalogCalled).toBe(false);
    expect(refetchCatalogsCalled).toBe(false);

    await waitFor(() => {
      const archiveModalAcceptButton = screen.getByTestId(/archive-modal-accept/);
      fireEvent.click(archiveModalAcceptButton);
    });

    await waitFor(() => {
      expect(archiveCatalogCalled).toBe(true);
      expect(refetchCatalogsCalled).toBe(true);

      expect(screen.queryByTestId(/modal$/)).not.toBeInTheDocument();
    });
  });
});
