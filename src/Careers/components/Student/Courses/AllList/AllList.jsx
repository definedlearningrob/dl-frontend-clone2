import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import allCoursesQuery from '@dc/graphql/student/queries/allCourses';
import studentAllCoursesQuery from '@dc/graphql/user/queries/studentAllCourses';
import { isEqual } from '@dc/utils';
import { ReactComponent as BackIcon } from '@dc/svg/back_ui.svg';
import { ReactComponent as NextIcon } from '@dc/svg/next_ui.svg';
import AllListSkeleton from '@dc/components/Dashboard/AllCourses/Skeleton/AllListSkeleton';
import { useCourseFilters } from '@dc/components/Courses/CourseFilters/useCourseFilters';
import { SearchableCourseCard } from '@dc/components/SearchableCourseCard/SearchableCourseCard';

import { ReactComponent as ChevronIcon } from '@shared/svg/chevron_right.svg';
import { ReactComponent as PlusIcon } from '@shared/svg/add.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as ShowMoreIcon } from '@shared/svg/chevron_down.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

const extractData = (data, isTeacher) => {
  if (!data) return { nodes: [], pagesCount: 0 };

  return isTeacher ? data.student.allCourses : data.allCourses;
};

const listClassname =
  'grid grid-cols-[repeat(4,_minmax(min-content,_1fr))] xxxl:grid-cols-[repeat(4,_minmax(min-content,_1fr))] gap-sm xxxl:gap-base';

const listItemClassname = 'h-[180px] xxxl:h-[268px]';

const StudentCoursesAllList = ({ selectCourse, teacherView, hasCompletedAssessment }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const { t } = useTranslation();
  const { filters: filter } = useCourseFilters();
  const previousFilters = useRef();

  useClearCacheOnUnmount('allCourses');

  const initialVariables = teacherView
    ? { perPage: 24, filter, uuid: id }
    : { perPage: 24, filter };

  const query = teacherView ? studentAllCoursesQuery : allCoursesQuery;

  const [queryRecords, { loading, data, fetchMore }] = useLazyQuery(query, {
    variables: { ...initialVariables, page: currentPage, infiniteScroll: true },
  });

  const onShowMore = () => {
    const newPage = currentPage + 1;
    fetchMore({
      variables: { perPage: 24, filter, page: newPage, infiniteScroll: true },
    });
    setCurrentPage(newPage);
  };

  const onPageChange = (page) => () => {
    setCurrentPage(page);
  };

  useEffect(() => {
    queryRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEqual(previousFilters.current, filter)) {
      setCurrentPage(1);
    }
  }, [filter, teacherView]);

  useEffect(() => {
    previousFilters.current = filter;
  });

  const extractedData = extractData(data, teacherView);

  if (!loading && isEmpty(extractedData.nodes)) {
    return (
      <div className='h-[120px] xxxl:h-[150px] text-center flex justify-center items-center'>
        {t('user.courses.emptyResults')}
      </div>
    );
  }

  return (
    <div className='grow flex flex-col justify-between'>
      <div className={listClassname}>
        {loading && <AllListSkeleton />}
        {!loading &&
          extractedData.nodes.map((course) => {
            const isEnrolled = course.isEnrolled;

            const cardConfig = {
              Icon: isEnrolled ? ChevronIcon : PlusIcon,
              TypeIcon: CourseIcon,
              backgroundUrl: course.thumbnailUrl,
              badge: {
                type: 'primary',
                text: course?.collection.name,
              },
              pathways: course.pathway ? [course.pathway] : undefined,
              title: course.name,
              typeIconTooltipMessage: t('student.courses.course'),
              metadata: course.metadata,
              ...(hasCompletedAssessment && {
                subTitle: t('student.courses.match', { match: course.match }),
              }),
              ...(isEnrolled && { to: `/courses/${course.id}` }),
              ...(!isEnrolled && { onClick: () => selectCourse(course) }),
              filterText: filter.searchableColumnsCont,
              highlightText: course.isRecommended ? t('student.courses.recommendedBadge') : null,
            };

            return (
              <div key={course.id} className={listItemClassname}>
                <SearchableCourseCard {...cardConfig} />
              </div>
            );
          })}
      </div>
      {teacherView ? (
        <div className='student-courses-all__paging-buttons'>
          <DeprecatedIconButton
            disabled={currentPage === 1 || loading}
            icon={<BackIcon />}
            variant='primary'
            onClick={onPageChange(currentPage - 1)}
          />
          <DeprecatedIconButton
            disabled={extractData(data, teacherView).pagesCount <= currentPage || loading}
            icon={<NextIcon />}
            variant='primary'
            onClick={onPageChange(currentPage + 1)}
          />
        </div>
      ) : (
        extractedData.pagesCount > currentPage && (
          <div className='student-courses-all__show-more' onClick={onShowMore}>
            <span>{t('student.courses.showMore')}</span>
            <SharedIcon icon={<ShowMoreIcon />} size='sm' />
          </div>
        )
      )}
    </div>
  );
};

StudentCoursesAllList.propTypes = {
  filter: PropTypes.shape({
    searchableColumnsCont: PropTypes.string,
  }),
  hasCompletedAssessment: PropTypes.bool,
  selectCourse: PropTypes.func,
  teacherView: PropTypes.bool,
};

export default StudentCoursesAllList;
