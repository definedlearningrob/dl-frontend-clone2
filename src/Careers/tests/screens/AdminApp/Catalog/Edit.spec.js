import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';

import CatalogEdit from '@dc/screens/AdminApp/Catalog/Edit';
import catalogQuery from '@dc/graphql/user/queries/catalog';
import tracksQuery from '@dc/graphql/user/queries/tracks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const catalogMocks = {
  request: {
    query: catalogQuery,
    variables: {
      id: '1',
    },
  },
  result: {
    data: {
      catalog: {
        description: 'First catalog description',
        displayName: 'Catalog 1',
        id: '1',
        imageUrl: 'first-image-url',
        thumbnailUrl: 'first-thumbnail-url',
        service: 'CAREER',
        tracks: [
          {
            id: '1',
            imageUrl: 'first-track-image-url',
            name: 'First track',
            step: '1',
            service: 'CAREER',
            units: [{ id: '1', name: 'First unit' }],
          },
        ],
        name: 'First catalog',
        status: 'draft',
      },
    },
  },
};

const trackMock = {
  request: {
    query: tracksQuery,
    variables: {
      filter: {
        serviceEq: 'CAREER',
      },
      scope: 'ACTIVE',
      page: 1,
      perPage: 10,
    },
  },
  result: {
    data: {
      tracks: {
        nodesCount: 1,
        pagesCount: 1,
        nodes: [
          {
            archivedAt: null,
            description: 'First track description',
            displayName: 'First track',
            grades: [],
            id: '1',
            imageUrl: 'first-track-image-url',
            name: 'First track',
            shortDescription: 'First track short description',
            service: 'CAREER',
            status: 'draft',
            thumbnailUrl: 'first-track-thumbnail-url',
            units: [
              {
                id: '1',
                name: 'First unit',
                imageUrl: 'first-unit-image-url',
                step: '1',
                service: 'CAREER',
              },
            ],
          },
        ],
      },
    },
  },
};

const mocks = [catalogMocks, trackMock];

const renderAdminAppCatalogEdit = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
          },
        }}>
        <NavigationContextProvider>
          <Route path='/admin/catalogs/:id/edit'>
            <CatalogEdit />
          </Route>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    {
      route: '/admin/catalogs/1/edit',
    }
  );

describe('AdminAppCatalogEdit', () => {
  it('renders with returned catalog data', async () => {
    renderAdminAppCatalogEdit();
    expect(await screen.findByText('Edit catalog')).toBeInTheDocument();
    const catalogName = await screen.findByDisplayValue('First catalog');
    const catalogDisplayName = await screen.findByDisplayValue('Catalog 1');
    const catalogStatus = await screen.findByText('Draft');

    expect(catalogName).toBeInTheDocument();
    expect(catalogDisplayName).toBeInTheDocument();
    expect(catalogStatus).toBeInTheDocument();
  });
});
