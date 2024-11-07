import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import Lessons from '@dc/components/Admin/Courses/Form/Lessons/Lessons';
import lessonsQuery from '@dc/graphql/user/queries/lessons';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

import { getLessonFilters, getLessonTypeOptions } from '../../helpers';

export const PostExperienceLessons = () => {
  const { t } = useTranslation();
  const [selectedLessonType, setSelectedLessonType] = useState(getLessonTypeOptions()[0]);

  const selectLessonType =
    (selectPage: (page: number) => void) => (type: { value: string; label: string }) => {
      selectPage(1);
      setSelectedLessonType(type);
    };

  return (
    <FilterProvider omitUrl={true}>
      {({ SearchBar, clearFilter, filter }) => (
        <SharedPaginatedLoader
          omitUrl={true}
          options={{
            variables: {
              filter: getLessonFilters(filter, selectedLessonType),
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
            },
          }}
          query={lessonsQuery}>
          {(props) => (
            <Lessons
              SearchBar={SearchBar}
              clearFilter={clearFilter}
              fieldName='postExperienceLessons'
              label={t('admin.virtualInternship.labels.postExperienceLessons')}
              lessonTypeOptions={getLessonTypeOptions()}
              pagingProps={props}
              selectLessonType={selectLessonType}
              selectedLessonType={selectedLessonType}
            />
          )}
        </SharedPaginatedLoader>
      )}
    </FilterProvider>
  );
};
