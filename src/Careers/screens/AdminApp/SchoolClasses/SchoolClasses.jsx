import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminSchoolClassesList from '@dc/components/Admin/SchoolClasses/List/List';
import schoolClassesQuery from '@dc/graphql/user/queries/schoolClasses';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppSchoolClasses() {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const TYPE_DEFAULT_VALUE = { value: null, label: t('admin.schoolClasses.demoSelect.all') };
  const schoolClassFilterOptions = [
    TYPE_DEFAULT_VALUE,
    { value: true, label: t('admin.schoolClasses.demoSelect.demo') },
    { value: false, label: t('admin.schoolClasses.demoSelect.nonDemo') },
  ];

  return (
    <section>
      <FormProvider>
        <SharedFilterProvider defaultFilter={{ isDemoEq: TYPE_DEFAULT_VALUE.value }}>
          {({ filter, ...filterProps }) => {
            const variables = useMemo(() => ({ filter }), [filter]);

            return (
              <SharedMainContent>
                <SharedPaginatedLoader options={{ variables }} query={schoolClassesQuery}>
                  {({ ...pagingProps }) => (
                    <>
                      <AdminFilters>
                        <SharedFilterProvider.Search
                          field='name'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.common.name').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                        <SharedFilterProvider.Search
                          field='entityName'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.common.entity').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                        <SharedFilterProvider.Select
                          field='isDemo'
                          initialValue={TYPE_DEFAULT_VALUE}
                          options={schoolClassFilterOptions}
                          {...filterProps}
                        />
                      </AdminFilters>
                      <AdminSchoolClassesList pagingProps={pagingProps} />
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

export default AdminAppSchoolClasses;
