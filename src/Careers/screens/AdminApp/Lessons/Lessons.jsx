import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import AdminLessonsList from '@dc/components/Admin/Lessons/List/List';
import lessonsQuery from '@dc/graphql/user/queries/lessons';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';
import { getLessonLabel } from '@dc/utils/lessons';
import { LESSON_TYPES } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select } from '@shared/components/Select';

const getLessonTypeOptions = (t) => {
  const allLessonsType = { value: null, label: t('common.fields.common.all') };
  const lessonTypes = Object.keys(LESSON_TYPES).map((key) => ({
    value: key.toLowerCase(),
    label: getLessonLabel(t, { type: key }),
  }));

  return [allLessonsType, ...lessonTypes];
};

function Lessons() {
  const { t } = useTranslation();
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const initialLessonType = params.type
    ? ARCHIVABLE_STATUSES[params.type]
    : getLessonTypeOptions(t)[0];
  const [scope, setScope] = useState(initialScope);

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  return (
    <FormProvider>
      <SharedFilterProvider>
        {({ filter, ...filterProps }) => {
          const variables = useMemo(() => ({ filter, scope: scope.value }), [filter, scope]);

          return (
            <SharedMainContent>
              <SharedPaginatedLoader
                options={{
                  fetchPolicy: 'network-only',
                  variables,
                }}
                query={lessonsQuery}>
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
                      <Select
                        options={Object.values(ARCHIVABLE_STATUSES)}
                        value={scope}
                        onChange={selectScope(pagingProps.selectPage)}
                      />
                      <SharedFilterProvider.Select
                        field='type'
                        initialValue={initialLessonType}
                        options={getLessonTypeOptions(t)}
                        {...filterProps}
                      />
                    </AdminFilters>
                    <AdminLessonsList pagingProps={pagingProps} refetchQuery={refetchQuery} />
                  </>
                )}
              </SharedPaginatedLoader>
            </SharedMainContent>
          );
        }}
      </SharedFilterProvider>
    </FormProvider>
  );
}

export default Lessons;
