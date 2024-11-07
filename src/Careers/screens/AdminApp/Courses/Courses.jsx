import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AdminCoursesList from '@dc/components/Admin/Courses/List/List';
import AdminFilters from '@dc/components/layout/Admin/Filters/Filters';
import coursesQuery from '@dc/graphql/user/queries/courses';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormProvider } from '@dc/hooks/useForm';
import { ARCHIVABLE_STATUSES, PUBLISHING_STATUSES, COURSE_TYPES } from '@dc/resources/constants';
import { useCollections } from '@dc/graphql/shared/hooks/useCollections';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select } from '@shared/components/Select';
import Switch from '@shared/components/Switch/Switch';

import styles from './Courses.module.sass';

function Courses() {
  const { t } = useTranslation();
  const { params, updateQueryParams } = useQueryParams();
  const initialScope = params.scope
    ? ARCHIVABLE_STATUSES[params.scope]
    : ARCHIVABLE_STATUSES.ACTIVE;
  const [scope, setScope] = useState(initialScope);
  const { data: collectionsData } = useCollections();
  const showCopies = params.showCopies === 'true';

  const STATUS_DEFAULT_VALUE = {
    value: PUBLISHING_STATUSES.PUBLISHED,
    label: t('common.publishingStatuses.published'),
  };
  const TYPE_DEFAULT_VALUE = { value: null, label: t('common.publishingStatuses.all') };
  const courseStatusOptions = [
    { value: null, label: t('common.publishingStatuses.all') },
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    STATUS_DEFAULT_VALUE,
  ];
  const courseTypeOptions = [
    TYPE_DEFAULT_VALUE,
    { value: COURSE_TYPES.HIGH_SCHOOL, label: t('courses.types.highSchool') },
    { value: COURSE_TYPES.MIDDLE_SCHOOL, label: t('courses.types.middleSchool') },
  ];

  const collectionOptions = useMemo(
    () =>
      collectionsData?.collections.map((collection) => ({
        label: collection.name,
        value: collection.id,
      })) || [],
    [collectionsData]
  );

  const toggleShowCopies = () => {
    updateQueryParams({ showCopies: !showCopies }, { withPush: false });
  };

  const selectScope = (selectPage) => (scope) => {
    selectPage(1);
    setScope(scope);
    updateQueryParams({ scope: scope.value });
  };

  return (
    <SharedMainContent>
      <div className='courses'>
        <FormProvider>
          <SharedFilterProvider defaultFilter={{ statusEq: PUBLISHING_STATUSES.PUBLISHED }}>
            {({ filter, ...filterProps }) => {
              const variables = useMemo(
                () => ({ scope: scope.value, filter, withCopies: showCopies }),
                [scope, filter, showCopies]
              );

              return (
                <SharedPaginatedLoader
                  options={{
                    fetchPolicy: 'network-only',
                    variables,
                  }}
                  query={coursesQuery}>
                  {({ refetchQuery, ...pagingProps }) => (
                    <>
                      <AdminFilters>
                        <SharedFilterProvider.Select
                          field='status'
                          initialValue={STATUS_DEFAULT_VALUE}
                          label={t('common.fields.course.status')}
                          options={courseStatusOptions}
                          {...filterProps}
                        />
                        <SharedFilterProvider.Select
                          field='type'
                          initialValue={TYPE_DEFAULT_VALUE}
                          label={t('common.fields.course.type')}
                          options={courseTypeOptions}
                          {...filterProps}
                        />
                        <Select
                          label={t('admin.courses.scope')}
                          options={Object.values(ARCHIVABLE_STATUSES)}
                          value={scope}
                          onChange={selectScope(pagingProps.selectPage)}
                        />
                        <SharedFilterProvider.Select
                          field='collectionId'
                          isMulti={true}
                          label={t('admin.courses.collection')}
                          options={collectionOptions}
                          selectClassName={styles.multiSelect}
                          {...filterProps}
                        />
                      </AdminFilters>
                      <AdminFilters>
                        <Switch
                          label={t('common.withCopies')}
                          labelFirst={true}
                          value={showCopies}
                          onChange={toggleShowCopies}
                        />
                        <SharedFilterProvider.Search
                          field='adminSearchableColumns'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.common.name').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                        <SharedFilterProvider.Search
                          field='pathwayName'
                          placeholder={t('common.placeholders.searchBy', {
                            field: t('common.fields.course.pathway').toLowerCase(),
                          })}
                          {...filterProps}
                        />
                      </AdminFilters>
                      <AdminCoursesList
                        pagingProps={pagingProps}
                        pathwayFilter={filter.pathwayNameCont}
                        refetchQuery={refetchQuery}
                        searchableFilter={filter.adminSearchableColumnsCont}
                        showCopies={showCopies}
                      />
                    </>
                  )}
                </SharedPaginatedLoader>
              );
            }}
          </SharedFilterProvider>
        </FormProvider>
      </div>
    </SharedMainContent>
  );
}

export default Courses;
