import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { GRADE_STATUSES } from '@dc/resources/constants';

import { SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge';

StudentLessonGradeStatus.propTypes = {
  grade: PropTypes.shape({
    lastGradedBy: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }),
  gradeStatus: PropTypes.string,
  showTextStatus: PropTypes.bool,
  statusClassName: PropTypes.string,
};

function StudentLessonGradeStatus({ grade, gradeStatus, showTextStatus, statusClassName }) {
  const { t } = useTranslation();

  const statusClass =
    'flex items-center gap-xs user-student__courses-activity-modal__footer-status';

  if (!gradeStatus) {
    return null;
  }

  const statusText = useMemo(
    () =>
      ({
        [GRADE_STATUSES.ACCEPTED]: t('user.student.coursesActivity.statuses.accepted'),
        [GRADE_STATUSES.NOT_ACCEPTED]: t('user.student.coursesActivity.statuses.notAccepted'),
        [GRADE_STATUSES.UPDATED]: t('user.student.coursesActivity.statuses.updated'),
      }[gradeStatus]),
    [gradeStatus, t]
  );

  return (
    <p className={statusClassName}>
      {showTextStatus && `${t('user.student.coursesActivity.status')}:`}
      <span className={statusClass} data-testid='item-status'>
        <SubmissionStatusBadge status={gradeStatus} statusLabel={statusText} />
        {gradeStatus !== GRADE_STATUSES.UPDATED && grade && (
          <span className='font-regular text-font-primary text-xs'>
            {t('user.student.coursesActivity.by', {
              name: `${grade.lastGradedBy?.firstName} ${grade.lastGradedBy?.lastName}`,
            })}
          </span>
        )}
      </span>
    </p>
  );
}

export default StudentLessonGradeStatus;
