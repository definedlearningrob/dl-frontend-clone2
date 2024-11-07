import { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import CourseActivity from '@dc/components/User/GradingSchoolClass/StudentItem/CourseActivity/CourseActivity';
import SharedReviewIndicator from '@dc/shared/ReviewIndicator/ReviewIndicator';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { EDUCATIONAL_RESOURCE_TYPES, CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { StageLabel } from '@shared/components/StageLabel';

UserGradingSchoolClassStudentItem.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    gradingByCourseNeeded: PropTypes.bool,
    lastName: PropTypes.string,
    settings: PropTypes.shape({
      assessmentType: PropTypes.shape({
        value: PropTypes.oneOf([
          CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
          CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
        ]),
      }),
    }),
  }),
};

function UserGradingSchoolClassStudentItem({
  student,
  student: { firstName, gradingByCourseNeeded, lastName, settings },
}) {
  const [isGradingListVisible, setGradingListVisibility] = useState(false);
  const { setItemToGradeByIndex } = useCourseActivity({ withQuery: isGradingListVisible });
  const { t } = useTranslation();

  const expandButtonClasses = cx('text-primary-500', {
    '-expanded rotate-180': isGradingListVisible,
  });

  const reviewAllButtonClasses = cx(
    'hidden group-hover:block hover:!bg-neutral-200 rounded-xs text-primary-500 text-xs mr-xs p-xs',
    {
      '-visible !block': isGradingListVisible,
    }
  );

  const toggleExpandGradingList = (event) => {
    if (event.target.id !== 'review-all-btn') {
      setGradingListVisibility(!isGradingListVisible);
    }
  };

  const openGradingModal = () => {
    setGradingListVisibility(true);
    setItemToGradeByIndex(0);
  };

  return (
    <li className='bg-white rounded-sm mb-sm p-sm'>
      <header
        className='flex justify-start items-center cursor-pointer group'
        data-testid='grading-student-item-header'
        onClick={toggleExpandGradingList}>
        <SharedAvatar size='32' user={{ firstName, lastName }} />
        <h3 className='text-primary-500 text-sm mx-sm mb-0 flex justify-start items-center'>
          {firstName} {lastName}
          <StageLabel
            inline={true}
            resourceType={EDUCATIONAL_RESOURCE_TYPES.STUDENT}
            stage={settings.assessmentType.value}
          />
        </h3>
        {gradingByCourseNeeded && <SharedReviewIndicator />}
        <div className='flex ml-auto'>
          <button
            className={reviewAllButtonClasses}
            data-testid='review-all-btn'
            id='review-all-btn'
            onClick={openGradingModal}>
            {t('user.grading.reviewAll')}
          </button>
          <DeprecatedIconButton className={expandButtonClasses} icon={<ArrowDown />} />
        </div>
      </header>
      {isGradingListVisible && <CourseActivity student={student} />}
    </li>
  );
}

export default UserGradingSchoolClassStudentItem;
