import { screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import {
  InstitutionFiltersProvider,
  useInstitutionFilters,
} from '@dc/shared/InstitutionFiltersProvider/InstitutionFiltersProvider';
import { renderWithRouter, renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

const MockedChildren = () => {
  const { filters } = useInstitutionFilters();

  return (
    <>
      <span>{filters.searchableColumnsCont}</span>
      <span>{filters.stateIn}</span>
      <span>{filters.typeIn}</span>
    </>
  );
};

describe('InstitutionFiltersProvider', () => {
  it('should initialize keyword filter', async () => {
    renderWithRouterAndReduxProvider(
      <MockedProvider>
        <UserInfoProvider
          value={{
            userInfo: {
              ...studentInfoMock.result.data.userInfo,
              uuid: '2',
              state: 'ALASKA',
            },
          }}>
          <InstitutionFiltersProvider>
            <MockedChildren />
          </InstitutionFiltersProvider>
        </UserInfoProvider>
      </MockedProvider>,
      {
        route: '/post-secondary?keyword=keyword-filter-value',
      }
    );

    expect(await screen.findByText('keyword-filter-value')).toBeInTheDocument();
  });

  it('should initialize location filter', async () => {
    renderWithRouter(
      <InstitutionFiltersProvider>
        <MockedChildren />
      </InstitutionFiltersProvider>,
      {
        route: '/post-secondary?location=ALASKA',
      }
    );

    expect(await screen.findByText('ALASKA')).toBeInTheDocument();
  });

  it('should initialize type filter', async () => {
    renderWithRouter(
      <InstitutionFiltersProvider>
        <MockedChildren />
      </InstitutionFiltersProvider>,
      {
        route: '/post-secondary?type=TYPE_FILTER_VALUE',
      }
    );

    expect(await screen.findByText('TYPE_FILTER_VALUE')).toBeInTheDocument();
  });
});
