import PropTypes from 'prop-types';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { CourseTypes } from '@graphql/dc/shared/types';
import { useTranslation } from 'react-i18next';
import { CourseStatuses } from '@graphql/dc/users/types';
import { isEmpty } from 'lodash-es';

import { ReactComponent as BackIcon } from '@dc/svg/back_ui.svg';
import { ReactComponent as NextIcon } from '@dc/svg/next_ui.svg';
import { useCourseFilters } from '@dc/components/Courses/CourseFilters/useCourseFilters';
import { useUserCourses } from '@dc/graphql/user/hooks/useUserCourses';
import { SearchableCourseCard } from '@dc/components/SearchableCourseCard/SearchableCourseCard';
import AllListSkeleton from '@dc/components/Dashboard/AllCourses/Skeleton/AllListSkeleton';

import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { BadgeType } from '@shared/components/Badge/Badge';

const listClassname =
  'grid grid-cols-[repeat(4,_minmax(min-content,_1fr))] xxxl:grid-cols-[repeat(4,_minmax(min-content,_1fr))] gap-sm xxxl:gap-base';

const listItemClassname = 'h-[180px] xxxl:h-[268px]';

export const CoursesList = () => {
  const { filters } = useCourseFilters();

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useUserCourses({
    page: currentPage,
    perPage: 24,
    filter: {
      ...filters,
      statusEq: CourseStatuses.PUBLISHED,
    },
  });

  const onPageChange = (page: number) => () => {
    setCurrentPage(page);
  };

  useUpdateEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const badgeMap = {
    [CourseTypes.HIGH_SCHOOL]: {
      type: 'primary' as BadgeType,
      text: t('courses.types.highSchool'),
    },
    [CourseTypes.MIDDLE_SCHOOL]: {
      type: 'secondary' as BadgeType,
      text: t('courses.types.middleSchool'),
    },
  };

  if (!loading && isEmpty(data?.courses.nodes)) {
    return (
      <div className='h-[300px] text-center flex justify-center items-center'>
        {t('user.courses.emptyResults')}
      </div>
    );
  }

  return (
    <div className='grow flex flex-col justify-between'>
      <ul className={listClassname}>
        {loading && <AllListSkeleton />}
        {!loading &&
          data &&
          data.courses.nodes.map((course) => {
            const cardConfig = {
              Icon: ChevronIcon,
              TypeIcon: CourseIcon,
              backgroundUrl: course.thumbnailUrl,
              badge: badgeMap[course.type],
              pathways: course.pathway ? [course.pathway] : undefined,
              subTitle: course.collection?.name,
              title: course.name,
              to: `/courses/${course.id}`,
              typeIconTooltipMessage: t('common.fields.common.course'),
              metadata: course.metadata,
              filterText: filters.searchableColumnsCont,
            };

            return (
              <li key={course.id} className={listItemClassname}>
                <SearchableCourseCard {...cardConfig} />
              </li>
            );
          })}
      </ul>
      <div className='student-courses-all__paging-buttons'>
        <DeprecatedIconButton
          disabled={currentPage === 1 || loading}
          icon={<BackIcon />}
          variant='primary'
          onClick={onPageChange(currentPage - 1)}
        />
        <DeprecatedIconButton
          disabled={(data && data.courses.pagesCount <= currentPage) || loading}
          icon={<NextIcon />}
          variant='primary'
          onClick={onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

CoursesList.propTypes = {
  filter: PropTypes.shape({
    searchableColumnsCont: PropTypes.string,
  }),
  selectCourse: PropTypes.func,
};
