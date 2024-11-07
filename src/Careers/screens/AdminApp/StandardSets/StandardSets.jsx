import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminStandardSetsList from '@dc/components/Admin/StandardSets/List/List';
import standardSetsQuery from '@dc/graphql/user/queries/standardSets';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

function AdminAppStandardSets() {
  const { t } = useTranslation();

  return (
    <FormProvider>
      <SharedMainContent>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => {
            const variables = useMemo(() => ({ filter }), [filter]);

            return (
              <SharedPaginatedLoader
                options={{ fetchPolicy: 'network-only', variables }}
                query={standardSetsQuery}>
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
                    <AdminStandardSetsList
                      pagingProps={pagingProps}
                      refetchQuery={refetchQuery}
                      selectPage={pagingProps.selectPage}
                    />
                  </>
                )}
              </SharedPaginatedLoader>
            );
          }}
        </SharedFilterProvider>
      </SharedMainContent>
    </FormProvider>
  );
}

export default AdminAppStandardSets;
