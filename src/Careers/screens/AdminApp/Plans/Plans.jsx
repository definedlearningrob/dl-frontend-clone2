import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminPlansList from '@dc/components/Admin/Plans/List/List';
import { PLANS_QUERY } from '@dc/graphql/user/queries/plans';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select } from '@shared/components/Select';

function AdminAppPlans() {
  const { t } = useTranslation();
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const [scope, setScope] = useState(initialScope);

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  return (
    <div className='lessons'>
      <FormProvider>
        <SharedMainContent>
          <SharedFilterProvider>
            {({ filter, ...filterProps }) => {
              const variables = useMemo(() => ({ filter, scope: scope.value }), [filter, scope]);

              return (
                <SharedPaginatedLoader
                  options={{
                    fetchPolicy: 'network-only',
                    variables,
                  }}
                  query={PLANS_QUERY}>
                  {({ refetchQuery, ...pagingProps }) => (
                    <>
                      <AdminFilters>
                        <Select
                          options={Object.values(ARCHIVABLE_STATUSES)}
                          showError={false}
                          value={scope}
                          onChange={selectScope(pagingProps.selectPage)}
                        />
                        <SharedFilterProvider.Search
                          field='name'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.common.name').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                      </AdminFilters>
                      <AdminPlansList
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
    </div>
  );
}

export default AdminAppPlans;
