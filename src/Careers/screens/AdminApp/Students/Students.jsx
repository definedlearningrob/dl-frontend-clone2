import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminStudentsList from '@dc/components/Admin/Students/List/List';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import StudentsQuery from '@dc/graphql/user/queries/students';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppStudents() {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const [scope, setScope] = useState(initialScope);

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  return (
    <section>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => {
            const variables = useMemo(() => ({ filter, scope: scope.value }), [filter, scope]);

            return (
              <SharedMainContent>
                <SharedPaginatedLoader options={{ variables }} query={StudentsQuery}>
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
                        <SharedSelect
                          options={Object.values(ARCHIVABLE_STATUSES)}
                          showError={false}
                          value={scope}
                          onChange={selectScope(pagingProps.selectPage)}
                        />
                      </AdminFilters>
                      <AdminStudentsList pagingProps={pagingProps} />
                    </>
                  )}
                </SharedPaginatedLoader>
              </SharedMainContent>
            );
          }}
        </SharedFilterProvider>
      </FormProvider>
    </section>
  );
}

export default AdminAppStudents;
