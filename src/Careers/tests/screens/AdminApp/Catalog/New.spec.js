import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createcatalogMutation from '@dc/graphql/user/mutations/createCatalog';
import CatalogNew from '@dc/screens/AdminApp/Catalog/New';
import tracksQuery from '@dc/graphql/user/queries/tracks';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

let createCatalogCalled = false;

const mocks = [
  {
    request: {
      query: tracksQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        tracks: {
          pagesCount: 1,
          nodesCount: 0,
          nodes: [],
        },
      },
    },
  },
  {
    request: {
      query: createcatalogMutation,
      variables: {
        input: {},
      },
    },
    result: () => {
      createCatalogCalled = true;

      return { data: {} };
    },
  },
];

const renderAdminAppCatalogNew = () => {
  const utils = renderWithRouterAndReduxProvider(
    <NavigationContextProvider>
      <MockedProvider mocks={mocks}>
        <CatalogNew />
      </MockedProvider>
    </NavigationContextProvider>
  );

  return { ...utils };
};

describe('AdminAppCatalogNew', () => {
  beforeEach(() => {
    createCatalogCalled = false;
  });

  it('renders with empty data', async () => {
    renderAdminAppCatalogNew();

    expect(screen.getByTestId(/catalogs-name-input/).value).toEqual('');
  });

  it('does not call create catalog mutation when form is not fully filled', async () => {
    renderAdminAppCatalogNew();

    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(createCatalogCalled).toBe(false);
    });

    fireEvent.change(screen.getByTestId('drop-zone-input'), {
      target: {
        files: [{ name: 'hello', size: 100 }],
      },
    });

    userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(createCatalogCalled).toBe(false);
    });

    fireEvent.keyPress(screen.getByTestId(/catalogs-name-input/));

    const saveButton = await screen.findByRole('button', { name: 'Save' });

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCatalogCalled).toBe(false);
    });
  });
});
