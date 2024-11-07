import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminUsersList from '@dc/components/Admin/Users/List/List';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import usersQuery, {
  TUsers,
  TAdminDashboardUsersVariables,
} from '@dc/graphql/user/queries/systemAdminUsers';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppUsers() {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <section>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => (
            <SharedMainContent>
              <SharedPaginatedLoader<TUsers, TAdminDashboardUsersVariables>
                getKey='adminDashboard.users'
                options={{ variables: { filter } }}
                query={usersQuery}>
                {({ ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedFilterProvider.Search
                        field='searchableColumns'
                        isWide={true}
                        placeholder={t('common.placeholders.searchBy', {
                          field: t('common.fields.common.nameOrEmailOrUsername').toLowerCase(),
                        })}
                        {...filterProps}
                      />
                    </AdminFilters>
                    <AdminUsersList pagingProps={pagingProps} />
                  </>
                )}
              </SharedPaginatedLoader>
            </SharedMainContent>
          )}
        </SharedFilterProvider>
      </FormProvider>
    </section>
  );
}

export default AdminAppUsers;
