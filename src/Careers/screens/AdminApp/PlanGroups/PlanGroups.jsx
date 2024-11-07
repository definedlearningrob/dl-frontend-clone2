import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminPlanGroupsList from '@dc/components/Admin/PlanGroups/List/List';
import planGroupsQuery from '@dc/graphql/user/queries/planGroups';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';

function PlanGroups() {
  const { params, updateQueryParams } = useQueryParams();
  const { t } = useTranslation();
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
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => (
            <SharedMainContent>
              <SharedPaginatedLoader
                options={{
                  fetchPolicy: 'network-only',
                  variables: { scope: scope.value, filter },
                }}
                query={planGroupsQuery}>
                {({ refetchQuery, ...pagingProps }) => (
                  <>
                    <AdminFilters>
                      <SharedSelect
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
                    <AdminPlanGroupsList
                      pagingProps={pagingProps}
                      refetchQuery={refetchQuery}
                      selectPage={pagingProps.selectPage}
                    />
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

export default PlanGroups;
