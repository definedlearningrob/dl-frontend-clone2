import { useTranslation } from 'react-i18next';

import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import { ARCHIVABLE_STATUSES, LESSON_TYPES } from '@dc/resources/constants';
import Lessons from '@dc/components/Admin/Courses/Form/Lessons/Lessons';
import lessonsQuery from '@dc/graphql/user/queries/lessons';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

import { getLessonFilters } from '../../helpers';

export const ExperienceOpportunityLessons = () => {
  const { t } = useTranslation();
  const defaultExperienceLessonType = {
    value: 'experience_opportunity',
    label: LESSON_TYPES.EXPERIENCE_OPPORTUNITY,
  };

  return (
    <FilterProvider omitUrl={true}>
      {({ SearchBar, clearFilter, filter }) => (
        <SharedPaginatedLoader
          omitUrl={true}
          options={{
            variables: {
              filter: getLessonFilters(filter, defaultExperienceLessonType),
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
            },
          }}
          query={lessonsQuery}>
          {(props) => (
            <Lessons
              SearchBar={SearchBar}
              clearFilter={clearFilter}
              fieldName='experienceOpportunityLessons'
              label={t('admin.virtualInternship.labels.experienceOpportunityLessons')}
              pagingProps={props}
              selectedLessonType={defaultExperienceLessonType}
            />
          )}
        </SharedPaginatedLoader>
      )}
    </FilterProvider>
  );
};
