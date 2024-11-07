import { useTranslation } from 'react-i18next';

import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { ARCHIVABLE_STATUSES, LESSON_TYPES } from '@dc/resources/constants';
import Lessons from '@dc/components/Admin/Courses/Form/Lessons/Lessons';
import lessonsQuery from '@dc/graphql/user/queries/lessons';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

import { getLessonFilters } from '../../helpers';

export const ReadinessSkillsLessons = () => {
  const { t } = useTranslation();
  const defaultReadinessLessonType = {
    value: 'career_readiness',
    label: LESSON_TYPES.CAREER_READINESS,
  };

  return (
    <FilterProvider omitUrl={true}>
      {({ SearchBar, clearFilter, filter }) => (
        <SharedPaginatedLoader
          omitUrl={true}
          options={{
            variables: {
              filter: getLessonFilters(filter, defaultReadinessLessonType),
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
            },
          }}
          query={lessonsQuery}>
          {(props) => (
            <Lessons
              SearchBar={SearchBar}
              clearFilter={clearFilter}
              fieldName='readinessSkillsLessons'
              label={t('admin.virtualInternship.labels.readinessSkillsLessons')}
              pagingProps={props}
              selectedLessonType={defaultReadinessLessonType}
            />
          )}
        </SharedPaginatedLoader>
      )}
    </FilterProvider>
  );
};
