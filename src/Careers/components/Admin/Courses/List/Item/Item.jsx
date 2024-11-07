import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import { shapeCourse } from '@dc/resources/typeDefs';

import SharedTextHighlighter from '@shared/components/TextHighlighter';
import SharedImage from '@shared/components/Image/Image';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import { CourseActions } from './CourseActions';

AdminCoursesListItem.propTypes = {
  course: shapeCourse,
  pathwayFilter: PropTypes.string,
  searchableFilter: PropTypes.string,
};

function AdminCoursesListItem({ course, pathwayFilter, searchableFilter }) {
  const { t } = useTranslation();

  const filteredAlternativeTitles = useMemo(() => {
    const { metadata } = course;

    if (metadata.alternativeTitles) {
      const titles = metadata.alternativeTitles.split(',').map((item) => item.trim());

      return titles.filter((title) => {
        const regEx = new RegExp(searchableFilter, 'ig');

        return title.search(regEx) !== -1;
      });
    }
  }, [course.metadata]);

  const filteredOnetCode = useMemo(() => {
    const { metadata } = course;
    const regEx = new RegExp(searchableFilter, 'ig');

    if (metadata.onetCode) {
      return metadata.onetCode.search(regEx) !== -1;
    }
  }, [course.metadata, searchableFilter]);

  const filteredId = useMemo(() => {
    const regEx = new RegExp(searchableFilter, 'ig');

    return course.id.search(regEx) !== -1;
  }, [course.id, searchableFilter]);

  const TooltipComponent = useCallback(
    () => (
      <div>
        {filteredId && (
          <>
            <h4>{t('dashboard.recommendedCard.courseId')}</h4>
            <SharedTextHighlighter text={searchableFilter} theme='light'>
              <span className='highlightible'>{course.id}</span>
            </SharedTextHighlighter>
          </>
        )}
        {filteredAlternativeTitles?.length > 0 && (
          <>
            <h4>{t('dashboard.recommendedCard.alternativeNames')}</h4>
            {filteredAlternativeTitles.map((title, index, array) => (
              <SharedTextHighlighter key={index} text={searchableFilter} theme='light'>
                <span className='highlightible'>
                  {title}
                  {index !== array.length - 1 ? '/' : ''}
                </span>
              </SharedTextHighlighter>
            ))}
          </>
        )}
        {filteredOnetCode && (
          <>
            <h4>{t('dashboard.recommendedCard.onetCode')}</h4>
            <SharedTextHighlighter text={searchableFilter} theme='light'>
              <span className='highlightible'>{course.metadata.onetCode}</span>
            </SharedTextHighlighter>
          </>
        )}
      </div>
    ),
    [course, searchableFilter, filteredId, filteredAlternativeTitles, filteredOnetCode]
  );

  const shouldShowTooltip = useMemo(
    () =>
      !!searchableFilter && (!!filteredAlternativeTitles?.length || filteredOnetCode || filteredId),
    [filteredAlternativeTitles, filteredOnetCode, searchableFilter, filteredId]
  );

  return (
    <SharedTableList.Row data-testid='courses-list-item'>
      <SharedTableList.Cell>
        <DeprecatedTooltip
          Component={TooltipComponent}
          className='recommended-card__tooltip'
          disabled={!shouldShowTooltip}>
          <SharedImage
            alt={t('admin.courses.list.item.altImage')}
            className='w-[86px] h-lg object-cover'
            src={course.thumbnailUrl}
          />
        </DeprecatedTooltip>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='courses-list-item-name'>
        <SharedTextHighlighter text={searchableFilter}>
          <span className='highlightible'>{course.name}</span>
        </SharedTextHighlighter>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='courses-list-item-displayName'>
        <SharedTextHighlighter text={searchableFilter}>
          <span className='highlightible'>{course.displayName}</span>
        </SharedTextHighlighter>
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='courses-list-item-status'>
        {course.status}
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='courses-list-item-pathway'>
        <SharedTextHighlighter text={pathwayFilter || searchableFilter}>
          <span className='highlightible'>{course.pathway?.name}</span>
        </SharedTextHighlighter>
        {course.pathway?.name}
      </SharedTableList.Cell>
      <SharedTableList.Cell>{course.collection?.name}</SharedTableList.Cell>
      <SharedTableList.Cell
        className='admin-list-item__expandable-list-container'
        data-testid='course-lessons'>
        <ul className='admin-list-item__expandable-list'>
          {course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className='admin-list-item__expandable-list-item'
              data-testid='courses-lesson'>
              {lesson.name} ({lesson.type})
            </li>
          ))}
        </ul>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <CourseActions course={course} />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminCoursesListItem;
