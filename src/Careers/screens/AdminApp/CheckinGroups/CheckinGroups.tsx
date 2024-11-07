import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminCheckinGroupsList from '@dc/components/Admin/CheckinGroups/List/List';
import checkinGroupsQuery, {
  type TCheckInGroupsData,
  type TCheckInGroupsVariables,
} from '@dc/graphql/user/queries/checkInGroups';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppCheckinGroups() {
  const { setBackNavButton } = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <div className='lessons'>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => (
            <SharedMainContent>
              <SharedPaginatedLoader<TCheckInGroupsData, TCheckInGroupsVariables>
                options={{ fetchPolicy: 'network-only', variables: { filter } }}
                query={checkinGroupsQuery}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedFilterProvider.Search
                        field='name'
                        placeholder={t('common.placeholders.searchBy', {
                          field: t('common.fields.common.name').toLowerCase(),
                        })}
                        {...filterProps}
                      />
                    </AdminFilters>
                    <AdminCheckinGroupsList pagingProps={pagingProps} refetchQuery={refetchQuery} />
                  </>
                )}
              </SharedPaginatedLoader>
            </SharedMainContent>
          )}
        </SharedFilterProvider>
      </FormProvider>
    </div>
  );
}

export default AdminAppCheckinGroups;
