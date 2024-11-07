import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminRubricsList from '@dc/components/Admin/Rubrics/List/List';
import { RUBRICS } from '@dc/graphql/user/queries/rubrics';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SharedSelect from '@dc/shared/Select/Select';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import Switch from '@shared/components/Switch/Switch';

function AdminAppRubrics() {
  const { params, updateQueryParams } = useQueryParams();
  const { t } = useTranslation();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const [scope, setScope] = useState(initialScope);
  const { setBackNavButton } = useNavigation();

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);
  const showCopies = params.showCopies === 'true';

  const toggleShowCopies = () => {
    updateQueryParams({ showCopies: !showCopies }, { withPush: false });
  };

  return (
    <div className='lessons'>
      <FormProvider>
        <SharedFilterProvider>
          {({ filter, ...filterProps }) => {
            const variables = useMemo(
              () => ({ filter, scope: scope.value, withCopies: showCopies }),
              [filter, scope, showCopies]
            );

            return (
              <SharedMainContent>
                <SharedPaginatedLoader
                  options={{
                    fetchPolicy: 'network-only',
                    variables,
                  }}
                  query={RUBRICS}>
                  {({ refetchQuery, ...pagingProps }) => (
                    <>
                      <AdminFilters>
                        <Switch
                          label={t('common.withCopies')}
                          labelFirst={true}
                          value={showCopies}
                          onChange={toggleShowCopies}
                        />
                        <SharedFilterProvider.Search
                          field='name'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.common.name').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                        <SharedSelect
                          className='lessons__lesson-filter plans-filter'
                          options={Object.values(ARCHIVABLE_STATUSES)}
                          showError={false}
                          value={scope}
                          onChange={selectScope(pagingProps.selectPage)}
                        />
                      </AdminFilters>
                      <AdminRubricsList
                        pagingProps={pagingProps}
                        refetchQuery={refetchQuery}
                        selectPage={pagingProps.selectPage}
                        showCopies={showCopies}
                      />
                    </>
                  )}
                </SharedPaginatedLoader>
              </SharedMainContent>
            );
          }}
        </SharedFilterProvider>
      </FormProvider>
    </div>
  );
}

export default AdminAppRubrics;
