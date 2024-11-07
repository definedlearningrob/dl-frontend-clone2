/* eslint-disable max-len */
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { pathwayShape } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';

const coursesShape = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  })
);

OnboardingResultCourseTable.propTypes = {
  courses: coursesShape,
  enrolledCourses: coursesShape,
  selectCourse: PropTypes.func,
  selectedPathway: pathwayShape,
};

function OnboardingResultCourseTable({ courses, enrolledCourses, selectCourse, selectedPathway }) {
  const firstCoursesPeriod = [1, 2, 3, 4].find((period) => getCoursesForPeriod(period).length);
  const [selectedPeriod, setSelectedPeriod] = useState(firstCoursesPeriod);
  const [otherExtended, setOtherExtended] = useState(false);
  const tabsContainerRef = useRef(null);
  const { t } = useTranslation();
  const courseSelect = (course) => () => selectCourse(course);
  const enrolledCoursesIds = enrolledCourses.map(({ id }) => id);
  const getDisabledState = (course) => enrolledCoursesIds.includes(course.id);
  const getYearLabelClasses = (element) =>
    cx(
      {
        '-selected': element === selectedPeriod,
      },
      'assessment-result-course-table__year-label'
    );

  useEffect(() => {
    setSelectedPeriod(firstCoursesPeriod);
  }, [selectedPathway]);

  const toggleExtended = useCallback(() => setOtherExtended(!otherExtended), [otherExtended]);

  function getCoursesForPeriod(period) {
    const jobZonesForPeriod = {
      1: [1, 2],
      2: [3],
      3: [4],
      4: [5],
    }[period];

    return courses.filter(({ metadata: { jobZone } }) =>
      jobZonesForPeriod?.includes(parseInt(jobZone))
    );
  }

  const allCourses = useMemo(
    () => getCoursesForPeriod(selectedPeriod),
    [selectedPathway, selectedPeriod]
  );

  const publishedCourses = useMemo(
    () => allCourses.filter(({ status }) => status === PUBLISHING_STATUSES.PUBLISHED),
    [allCourses]
  );

  const draftCourses = useMemo(
    () => allCourses.filter(({ status }) => status === PUBLISHING_STATUSES.DRAFT),
    [allCourses]
  );

  const scrollToTab = (tabIndex) => {
    const tab = tabsContainerRef.current.children[tabIndex];
    const tabLeftPosition = tab.getBoundingClientRect().left;
    const tabRightPosition = tab.getBoundingClientRect().right;
    const container = tabsContainerRef.current;
    const containerWidth = tabsContainerRef.current.clientWidth;

    if (tabRightPosition > containerWidth) {
      container.scrollLeft += tabRightPosition - containerWidth;
    } else {
      container.scrollLeft += tabLeftPosition - containerWidth;
    }
  };

  const selectPeriod = (period) => () => {
    scrollToTab(period - 1);
    setSelectedPeriod(period);
    setOtherExtended(false);
  };

  const hasCourses = useMemo(() => allCourses.length > 0, [allCourses, selectedPathway]);
  const hasPublishedCourses = useMemo(() => publishedCourses.length > 0, [publishedCourses]);
  const hasDraftCourses = useMemo(() => draftCourses.length > 0, [draftCourses]);

  const otherCoursesTableClasses = useMemo(
    () =>
      cx('assessment-result-course-table__table', {
        '-hidden': !otherExtended && publishedCourses.length,
      }),
    [otherExtended, publishedCourses]
  );

  const arrowClasses = useMemo(
    () =>
      cx('assessment-result-course-table__other-divider__icon', {
        '-extended': otherExtended,
      }),
    [otherExtended]
  );

  return (
    <section className='assessment-result-course-table' id='course-table'>
      <h2 className='assessment-result-course-table__pathway-title'>{selectedPathway.name}</h2>
      <p className='assessment-result-course-table__pathway-description'>
        {selectedPathway.description}
      </p>
      <div ref={tabsContainerRef} className='assessment-result-course-table__year-labels'>
        {getCoursesForPeriod(1).length ? (
          <div onClick={selectPeriod(1)}>
            <DeprecatedTooltip
              className={getYearLabelClasses(1)}
              message={t('student.onboarding.pathway.course.firstSectionTooltip')}>
              <span>{t('student.onboarding.pathway.course.firstYearLabel')}</span>
            </DeprecatedTooltip>
          </div>
        ) : (
          <div />
        )}
        {getCoursesForPeriod(2).length ? (
          <div onClick={selectPeriod(2)}>
            <DeprecatedTooltip
              className={getYearLabelClasses(2)}
              message={t('student.onboarding.pathway.course.secondSectionTooltip')}>
              <span>
                {t('student.onboarding.pathway.course.yearLabel', {
                  year: '1 - 3',
                })}
              </span>
            </DeprecatedTooltip>
          </div>
        ) : (
          <div />
        )}
        {getCoursesForPeriod(3).length ? (
          <div onClick={selectPeriod(3)}>
            <DeprecatedTooltip
              className={getYearLabelClasses(3)}
              message={t('student.onboarding.pathway.course.thirdSectionTooltip')}>
              <span>
                {t('student.onboarding.pathway.course.yearLabel', {
                  year: '4',
                })}
              </span>
            </DeprecatedTooltip>
          </div>
        ) : (
          <div />
        )}
        {getCoursesForPeriod(4).length ? (
          <div onClick={selectPeriod(4)}>
            <DeprecatedTooltip
              className={getYearLabelClasses(4)}
              message={t('student.onboarding.pathway.course.fourthSectionTooltip')}>
              <span>
                {t('student.onboarding.pathway.course.yearLabel', {
                  year: '5 +',
                })}
              </span>
            </DeprecatedTooltip>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className='assessment-result-course-table__table'>
        <div className='assessment-result-course-table__row-wrapper -header'>
          <span className='assessment-result-course-table__name-cell -header'>
            {t('common.fields.common.name')}
          </span>
          <span className='assessment-result-course-table__description-cell -header'>
            {t('common.fields.common.description')}
          </span>
          <span className='assessment-result-course-table__button-cell -header' />
        </div>
        {!hasPublishedCourses && hasCourses && (
          <div className='assessment-result-course-table__empty-message'>
            {t('student.onboarding.pathway.course.emptyListOfPublishedCourses')}
          </div>
        )}
        {!hasCourses && (
          <div className='assessment-result-course-table__empty-message'>
            {t('student.onboarding.pathway.course.emptyListOfCourses')}
          </div>
        )}
        {publishedCourses.map((course) => (
          <div key={course.id} className='assessment-result-course-table__row-wrapper'>
            <span className='assessment-result-course-table__name-cell'>{course.name}</span>
            <span className='assessment-result-course-table__description-cell'>
              {course.description}
            </span>
            <div className='assessment-result-course-table__button-cell'>
              <SharedButton
                disabled={getDisabledState(course)}
                variant='primary'
                onClick={courseSelect(course)}>
                {t('student.onboarding.pathway.viewEnroll')}
              </SharedButton>
            </div>
          </div>
        ))}
      </div>
      {hasDraftCourses && (
        <>
          {hasPublishedCourses && (
            <div className='assessment-result-course-table__other-divider' onClick={toggleExtended}>
              {t('student.onboarding.pathway.seeOther')}
              <SharedIcon className={arrowClasses} icon={<ArrowUp />} size='sm' />
            </div>
          )}
          <div className={otherCoursesTableClasses}>
            {draftCourses.map((course) => (
              <div key={course.id} className='assessment-result-course-table__row-wrapper'>
                <span className='assessment-result-course-table__name-cell'>{course.name}</span>
                <span className='assessment-result-course-table__description-cell'>
                  {course.description}
                </span>
                <div className='assessment-result-course-table__button-cell'>
                  <SharedButton
                    disabled={getDisabledState(course)}
                    variant='primary-outlined'
                    onClick={courseSelect(course)}>
                    {t('student.onboarding.pathway.view')}
                  </SharedButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default OnboardingResultCourseTable;
