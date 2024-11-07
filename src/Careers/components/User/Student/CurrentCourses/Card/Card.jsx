import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProgressCircle from '@dc/shared/ProgressCircle/ProgressCircle';
import UnassignModal from '@dc/components/User/Student/CurrentCourses/Card/UnassignModal/UnassignModal';
import { COURSE_TYPES, EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';
import { shapeStudent } from '@dc/resources/typeDefs';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { StageLabel } from '@shared/components/StageLabel';

UserStudentCurrentCoursesCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    progress: PropTypes.shape({
      submitted: PropTypes.number,
      total: PropTypes.number,
    }),
    type: PropTypes.oneOf([COURSE_TYPES.HIGH_SCHOOL, COURSE_TYPES.MIDDLE_SCHOOL]),
  }),
  student: shapeStudent,
};

function UserStudentCurrentCoursesCard({ course, student }) {
  const [isUnassignModalOpen, setUnassignModalVisibility] = useState(false);
  const { t } = useTranslation();
  const { submitted, total } = course.progress;
  const inProgress = total > 0 && submitted > 0 && total - submitted !== 0;
  const cardClasses = cx('user-student__current-courses-card', {
    '-not-started': course.progress.submitted === 0,
    '-in-progress': inProgress,
  });

  const toogleUnassignModalOpen = () => setUnassignModalVisibility(!isUnassignModalOpen);

  return (
    <>
      <div className={cardClasses} data-testid='current-courses-item'>
        <ProgressCircle
          displayPercentageText={true}
          size='sm'
          target={course.progress.total}
          value={course.progress.submitted}
        />
        <StageLabel resourceType={EDUCATIONAL_RESOURCE_TYPES.COURSE} stage={course.type} />
        <DeprecatedTooltip
          className='user-student__current-courses-card__tooltip'
          message={t('user.student.currentCourses.unassignInfo')}
          variant='dark'>
          <DeprecatedIconButton
            className='user-student__current-courses-card__icon-button'
            icon={<Delete />}
            onClick={toogleUnassignModalOpen}
          />
        </DeprecatedTooltip>
        <h2 className='user-student__current-courses-card__title'>{course.name}</h2>
      </div>
      <UnassignModal
        courseId={course.id}
        courseName={course.name}
        isOpen={isUnassignModalOpen}
        student={student}
        onClose={toogleUnassignModalOpen}
      />
    </>
  );
}

export default UserStudentCurrentCoursesCard;
