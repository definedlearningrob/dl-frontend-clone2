import { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import EntitiesList from '@dc/components/User/Dashboard/SystemAdminView/Content/EntitiesList/EntitiesList';
import SharedFilterProvider from '@dc/components/shared/FilterProvider/FilterProvider';
import SharedTabs from '@dc/components/Portfolio/Tabs/Tabs';
import systemAdminEntitiesQuery from '@dc/graphql/user/queries/systemAdminEntities';
import systemAdminUsersQuery from '@dc/graphql/user/queries/systemAdminUsers';
import UsersList from '@dc/components/User/Dashboard/SystemAdminView/Content/UsersList/UsersList';
import { TabsContext } from '@dc/components/Portfolio/Tabs/Tabs';
import EntityAdminTablesSkeleton from '@dc/components/User/Dashboard/EntityAdminView/Skeleton/Tables/Tables';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const TABS_IDS = {
  ENTITIES: 'entities',
  USERS: 'users',
};

const PER_PAGE = 16;

function UserDashboardSystemAdminViewContent() {
  const filterRef = useRef(null);
  const renderCounter = useRef(0);
  const { tab } = useContext(TabsContext);
  const { t } = useTranslation();

  const filterConfig = {
    field: tab.id === TABS_IDS.ENTITIES ? 'name' : 'fullName',
    placeholder:
      tab.id === TABS_IDS.ENTITIES
        ? t('common.placeholders.searchFor', {
            field: t('common.fields.entity.entities').toLowerCase(),
          })
        : t('common.placeholders.searchFor', {
            field: t('common.fields.common.users').toLowerCase(),
          }),
  };

  const Spinner = () => (
    <div className='system-admin-view__spinner'>
      <SharedLoadingSpinner size='small' />
    </div>
  );

  return (
    <div>
      <SharedFilterProvider>
        {({ filter, ...filterProps }) => {
          filterRef.current = filter;

          return (
            <>
              <header className='system-admin-view__header'>
                <SharedTabs.Tabs />
                <SharedFilterProvider.Search
                  className='system-admin-view__filter'
                  field={filterConfig.field}
                  placeholder={filterConfig.placeholder}
                  {...filterProps}
                />
              </header>
              {tab.id === TABS_IDS.ENTITIES && (
                <SharedPaginatedLoader
                  getKey='adminDashboard.entities'
                  options={{
                    variables: {
                      filter: { nameCont: filter.nameCont },
                    },
                  }}
                  pageName='entityPage'
                  perPage={PER_PAGE}
                  query={systemAdminEntitiesQuery}>
                  {(pagingProps) => (
                    <>
                      <SharedPaginatedLoader.Content
                        SpinnerComponent={
                          <EntityAdminTablesSkeleton withoutHeader={true} withoutPadding={true} />
                        }
                        {...pagingProps}>
                        {({ adminDashboard: { entities } }) => (
                          <EntitiesList entities={entities} renderCounter={renderCounter} />
                        )}
                      </SharedPaginatedLoader.Content>
                      <div className='system-admin-view__pagination-bar'>
                        <SharedPaginatedLoader.PreviousPage {...pagingProps} />
                        <SharedPaginatedLoader.PagingSlider {...pagingProps} />
                        <SharedPaginatedLoader.NextPage {...pagingProps} />
                      </div>
                    </>
                  )}
                </SharedPaginatedLoader>
              )}
              {tab.id === TABS_IDS.USERS && (
                <SharedPaginatedLoader
                  SpinnerComponent={Spinner}
                  getKey='adminDashboard.users'
                  options={{
                    variables: {
                      filter: {
                        fullNameCont: filter.fullNameCont,
                      },
                    },
                  }}
                  pageName='userPage'
                  perPage={PER_PAGE}
                  query={systemAdminUsersQuery}>
                  {(pagingProps) => (
                    <>
                      <SharedPaginatedLoader.Content
                        SpinnerComponent={
                          <EntityAdminTablesSkeleton withoutHeader={true} withoutPadding={true} />
                        }
                        {...pagingProps}>
                        {({ adminDashboard: { users } }) => <UsersList users={users} />}
                      </SharedPaginatedLoader.Content>
                      <div className='system-admin-view__pagination-bar'>
                        <SharedPaginatedLoader.PreviousPage {...pagingProps} />
                        <SharedPaginatedLoader.PagingSlider {...pagingProps} />
                        <SharedPaginatedLoader.NextPage {...pagingProps} />
                      </div>
                    </>
                  )}
                </SharedPaginatedLoader>
              )}
            </>
          );
        }}
      </SharedFilterProvider>
    </div>
  );
}

export default UserDashboardSystemAdminViewContent;
