import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedTable from '@dc/shared/Table/Table';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import '@dc/components/Onboarding/Result/Courses/Table/Table.sass';

import SharedButton from '@shared/components/Button/Button';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import OnboardingResultCoursesTableEmptyWrapper from './EmptyWrapper/EmptyWrapper';

const coursesShape = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  })
);

OnboardingResultCoursesTable.propTypes = {
  activePeriodCourses: coursesShape,
  enrolledCourses: coursesShape,
  selectCourse: PropTypes.func,
};

function OnboardingResultCoursesTable({ activePeriodCourses, enrolledCourses, selectCourse }) {
  const [otherExtended, setOtherExtended] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOtherExtended(false);
  }, [activePeriodCourses]);

  const publishedCourses = useMemo(
    () => activePeriodCourses.filter(({ status }) => status === PUBLISHING_STATUSES.PUBLISHED),
    [activePeriodCourses]
  );
  const draftCourses = useMemo(
    () => activePeriodCourses.filter(({ status }) => status === PUBLISHING_STATUSES.DRAFT),
    [activePeriodCourses]
  );

  const hasCourses = useMemo(() => activePeriodCourses.length > 0, [activePeriodCourses]);
  const hasPublishedCourses = useMemo(() => publishedCourses.length > 0, [publishedCourses]);
  const hasDraftCourses = useMemo(() => draftCourses.length > 0, [draftCourses]);
  const enrolledCoursesIds = enrolledCourses.map(({ id }) => id);

  const otherCoursesTableClasses = useMemo(
    () =>
      cx('assessment-result-courses-table__other-courses', {
        '-hidden': !otherExtended && publishedCourses.length,
      }),
    [otherExtended, publishedCourses]
  );

  const arrowClasses = useMemo(
    () =>
      cx('bg-neutral-200 rounded-xs bg-transparent', {
        '-extended': otherExtended,
      }),
    [otherExtended]
  );

  const toggleExtended = useCallback(() => setOtherExtended(!otherExtended), [otherExtended]);

  const getDisabledState = (course) => enrolledCoursesIds.includes(course.id);

  const handleCourseSelection = (course) => () => selectCourse(course);

  const tableConstants = () => [
    {
      title: t('common.fields.common.name'),
      render: (rowData) => <span data-testid='onboarding-table-course-name'>{rowData.name}</span>,
    },
    {
      title: t('common.fields.common.description'),
      render: (rowData) => (
        // eslint-disable-next-line react/no-danger
        <span dangerouslySetInnerHTML={cleanInjection(rowData.description)} />
      ),
    },
    {
      title: null,
      render: (rowData) => (
        <SharedButton
          data-testid='onboarding-table-course-button'
          disabled={getDisabledState(rowData)}
          variant='primary'
          onClick={handleCourseSelection(rowData)}>
          {rowData.status === PUBLISHING_STATUSES.PUBLISHED
            ? t('student.onboarding.pathway.viewEnroll')
            : t('student.onboarding.pathway.view')}
        </SharedButton>
      ),
    },
  ];

  const PublishedCoursesList = () => {
    if (!hasPublishedCourses && hasCourses) {
      return (
        <OnboardingResultCoursesTableEmptyWrapper
          className='assessment-result-courses-table__empty-message'
          message={t('student.onboarding.pathway.course.emptyListOfPublishedCourses')}
        />
      );
    }

    if (!hasCourses) {
      return (
        <OnboardingResultCoursesTableEmptyWrapper
          className='assessment-result-courses-table__empty-message'
          message={t('student.onboarding.pathway.course.emptyListOfCourses')}
        />
      );
    }

    return <SharedTable.Body cols={tableConstants()} data={publishedCourses} />;
  };

  const DraftCoursesList = () => (
    <div className={otherCoursesTableClasses}>
      <SharedTable>
        <SharedTable.Body cols={tableConstants()} data={draftCourses} />
      </SharedTable>
    </div>
  );

  const ExtendDraftCoursesButton = () => (
    <div
      className='assessment-result-courses-table__other-divider'
      data-testid='onboarding-table-draft-courses-divider'
      onClick={toggleExtended}>
      {t('student.onboarding.pathway.seeOther')}
      <IconContainer
        Icon={otherExtended ? ArrowUp : ArrowDown}
        className={arrowClasses}
        paddingSize='xs'
      />
    </div>
  );

  return (
    <section className='assessment-result-courses-table'>
      <SharedTable>
        <SharedTable.Head cols={tableConstants()} />
        <PublishedCoursesList />
      </SharedTable>
      {hasPublishedCourses && hasDraftCourses && <ExtendDraftCoursesButton />}
      {hasDraftCourses && <DraftCoursesList />}
    </section>
  );
}

export default OnboardingResultCoursesTable;
