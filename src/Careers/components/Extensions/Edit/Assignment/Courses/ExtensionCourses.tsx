import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ObservableQueryFields } from '@apollo/client';

import GET_COURSES, {
  type TExtensionCoursesData,
  type TExtensionCoursesVariables,
} from '@dc/graphql/user/queries/extensionCourses';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';

import useClearCacheKey from '@shared/hooks/useClearCacheKey';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import useFilter from '@shared/hooks/useFilter';

import { type TExtensionAssignment } from '../../Edit';
import styles from '../Assignment.module.sass';

type TParsedExtensionAssignmentFields = Omit<
  TExtensionAssignment,
  'publishedFrom' | 'publishedTo' | 'status'
>;

type Props = {
  onChange: (
    type: keyof TParsedExtensionAssignmentFields,
    value: { id: string; name: string }
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  assignedCourses: TExtensionCoursesData['courses']['nodes'];
};

const COURSES_PER_PAGE = 20;

const ExtensionCourses = ({ assignedCourses, onChange }: Props) => {
  const [field] = useField<TExtensionAssignment['courses']>('courses');
  const [currentPage, setCurrentPage] = useState(1);
  const { clearCache } = useClearCacheKey();
  const { t } = useTranslation();

  const onShowMore =
    (
      fetchMore:
        | ObservableQueryFields<TExtensionCoursesData, TExtensionCoursesVariables>['fetchMore']
        | undefined
    ) =>
    () => {
      const newPage = currentPage + 1;

      fetchMore &&
        fetchMore({
          variables: { page: newPage, perPage: COURSES_PER_PAGE },
        });

      setCurrentPage(newPage);
    };

  const onFilterChange = () => {
    setCurrentPage(1);
    clearCache('courses');
  };

  const { fields, filter, handleChange } = useFilter<{ nameCont: string }>({
    omitUrl: true,
    onFilterChange,
  });

  const getFilteredCourses = (
    courses: TExtensionCoursesData['courses']['nodes'],
    filter?: string
  ) =>
    filter
      ? courses.filter((course) => course.name.toLowerCase().includes(filter.toLowerCase()))
      : courses;

  const getSortedCourses = (courses: TExtensionCoursesData['courses']['nodes']) =>
    [...courses].sort((a, b) => {
      if (
        field.value.find((obj) => obj.id === a.id) &&
        !field.value.find((obj) => obj.id === b.id)
      ) {
        return -1;
      }

      return 1;
    });

  const parseCourses = (courses: TExtensionCoursesData['courses']['nodes'], filter?: string) => {
    const allCourses = [...assignedCourses, ...field.value, ...courses];
    const uniqueCourses = [...new Map(allCourses.map((course) => [course.id, course])).values()];

    return getSortedCourses(getFilteredCourses(uniqueCourses, filter));
  };

  return (
    <>
      <div className={styles.assignmentHeader}>
        <h4 className={styles.header}>{t('user.dashboard.extensionFields.settings.courses')}</h4>
        <SharedFilterProvider.Search
          field='name'
          fields={fields}
          handleChange={handleChange}
          placeholder={t('common.placeholders.search')}
        />
      </div>
      <div className={styles.box}>
        <SharedDataLoader<TExtensionCoursesData>
          options={{
            variables: {
              filter: {
                ...filter,
                statusEq: 'PUBLISHED',
              },
              page: currentPage,
              perPage: COURSES_PER_PAGE,
              scope: 'ACTIVE',
              infiniteScroll: true,
            },
          }}
          query={GET_COURSES}>
          {({ courses: { nodes: coursesList }, courses }, fetchMore) => (
            <SharedInfiniteScrollContainer
              className={styles.list}
              fetchMore={onShowMore(fetchMore)}
              hasNextPage={courses.pagesCount >= currentPage}>
              {parseCourses(coursesList, filter.nameCont).map((course) => (
                <SharedCheckbox
                  key={course.id}
                  checked={!!field.value.find((obj) => obj.id === course.id)}
                  id={course.id}
                  label={course.name}
                  value={course.id}
                  onChange={onChange('courses', { id: course.id, name: course.name })}
                />
              ))}
            </SharedInfiniteScrollContainer>
          )}
        </SharedDataLoader>
      </div>
    </>
  );
};

export default ExtensionCourses;
