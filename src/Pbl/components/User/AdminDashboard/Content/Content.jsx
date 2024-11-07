import React, { useContext, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import EntityAdminTablesSkeleton from '@dc/components/User/Dashboard/EntityAdminView/Skeleton/Tables/Tables';

import systemAdminEntitiesQuery from '@pbl/graphql/user/queries/systemAdminEntity';
import { TABS_IDS } from '@pbl/resources/enums';
import { EntitiesList } from '@pbl/components/User/AdminDashboard/Content/EntityList/EntitiesList';
import { UsersList } from '@pbl/components/User/AdminDashboard/Content/UserList/UsersList';
import {
  SharedTabs,
  SharedTabsContext,
} from '@pbl/components/User/AdminDashboard/context/SharedTabs';
import systemAdminUsersQuery from '@pbl/graphql/user/queries/systemAdminUser';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

import styles from './Content.module.sass';

const PER_PAGE = 16;

export const Content = () => {
  const filterRef = useRef(null);
  const renderCounter = useRef(0);
  const { tab } = useContext(SharedTabsContext);
  const { t } = useTranslation();

  const entitiesTab = tab?.id === TABS_IDS.ENTITIES;

  const filterConfig = {
    field: entitiesTab ? 'name' : 'fullName',
    placeholder: entitiesTab
      ? t('common.placeholders.searchFor', {
          field: t('common.fields.common.entity').toLowerCase(),
        })
      : t('common.placeholders.searchFor', {
          field: t('common.fields.common.users').toLowerCase(),
        }),
  };

  return (
    <SharedFilterProvider>
      {({ filter, ...filterProps }) => {
        filterRef.current = filter;

        const entitiesVariables = useMemo(
          () => ({ filter: { nameCont: filter.nameCont } }),
          [filter]
        );

        const usersVariables = useMemo(
          () => ({
            filter: {
              fullNameCont: filter.fullNameCont,
            },
          }),
          [filter]
        );

        return (
          <>
            <header className={styles.header}>
              <SharedTabs.Tabs />
              <SharedFilterProvider.Search
                className={styles.filter}
                field={filterConfig.field}
                placeholder={filterConfig.placeholder}
                {...filterProps}
              />
            </header>
            {entitiesTab && (
              <SharedPaginatedLoader
                getKey='adminDashboard.entities'
                options={{
                  variables: entitiesVariables,
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
                    <div className={styles.paginationBar}>
                      <SharedPaginatedLoader.PreviousPage {...pagingProps} />
                      <SharedPaginatedLoader.PagingSlider {...pagingProps} />
                      <SharedPaginatedLoader.NextPage {...pagingProps} />
                    </div>
                  </>
                )}
              </SharedPaginatedLoader>
            )}
            {!entitiesTab && (
              <SharedPaginatedLoader
                getKey='adminDashboard.users'
                options={{
                  variables: usersVariables,
                }}
                pageName='userPage'
                perPage={PER_PAGE}
                query={systemAdminUsersQuery}>
                {(pagingProps) => (
                  <>
                    <SharedPaginatedLoader.Content
                      SpinnerComponent={<EntityAdminTablesSkeleton />}
                      {...pagingProps}>
                      {({ adminDashboard: { users } }) => <UsersList users={users} />}
                    </SharedPaginatedLoader.Content>
                    <div className={styles.paginationBar}>
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
  );
};
