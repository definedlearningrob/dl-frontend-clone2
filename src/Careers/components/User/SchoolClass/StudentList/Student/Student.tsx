import cx from 'classnames';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/layout/Dashboard/Card/Card';
import SharedReviewIndicator from '@dc/shared/ReviewIndicator/ReviewIndicator';
import { EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';
import { ReactComponent as NewMessageIcon } from '@dc/svg/comment_text_outlined.svg';
import { TSchoolClassStudent } from '@dc/graphql/user/queries/schoolClassWithStudents';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { ReactComponent as RightIcon } from '@shared/svg/arrow_forward.svg';
import { StageLabel } from '@shared/components/StageLabel';

type Props = {
  setupModal: (student: TSchoolClassStudent) => void;
  student: TSchoolClassStudent;
};

function UserSchoolClassStudentListStudent({ setupModal, student }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const assessmentText = useMemo(
    () => t(`user.class.assessmentCompleted.${student.assessmentCompleted}`),
    [student.assessmentCompleted]
  );
  const assessmentClasses = cx('user-class__student__assessment', {
    '-done': student.assessmentCompleted,
  });

  const reviewClasses = cx('user-class__student__review-indicator', {
    '-hidden': !student.gradingNeeded,
  });

  const viewProfileClasses = cx('user-class__student__view-profile-button', {
    '-needs-review': student.gradingNeeded,
  });

  const avatarClasses = cx('user-class__student__avatar', {
    '-archived': student.archivedAt,
  });

  const nameClasses = cx('user-class__student__name', {
    '-archived': student.archivedAt,
  });

  const setupModalWithStudent = useCallback(() => setupModal(student), [student]);

  const goToStudent = () => history.push(`/students/${student.uuid}`);

  return (
    <Card className='user-class__student' white={true}>
      <div className='user-class__student__header'>
        <div className='user-class__student__educational-logo-wrapper'>
          <StageLabel
            resourceType={EDUCATIONAL_RESOURCE_TYPES.STUDENT}
            stage={student.settings.assessmentType.value}
          />
        </div>
        <div className='user-class__student__avatar-wrapper'>
          {student.archivedAt && (
            <div className='user-class__student__archived-icon'>
              <DeprecatedTooltip message={t('user.class.archivedInfo')} variant='dark'>
                <SharedIcon icon={<InfoIcon />} size='xxs' />
              </DeprecatedTooltip>
            </div>
          )}
          <SharedAvatar className={avatarClasses} size='32' user={student} />
        </div>
        <button className='user-class__student__message-button' onClick={setupModalWithStudent}>
          <SharedIcon icon={<NewMessageIcon />} size='sm' />
        </button>
      </div>
      <span className={nameClasses}>
        {student.firstName} {student.lastName}
      </span>
      <div className={assessmentClasses}>
        <span>{assessmentText}</span>
      </div>
      <span className='user-class__student__course-progress'>
        {t('user.class.courseProgress', {
          completed: student.coursesCompleted,
          enrolled: student.coursesEnrolled,
        })}
      </span>
      <SharedReviewIndicator className={reviewClasses} />
      <button className={viewProfileClasses} onClick={goToStudent}>
        <span>{t('user.class.viewProfile')}</span>
        <SharedIcon icon={<RightIcon />} size='xs' />
      </button>
    </Card>
  );
}

export default UserSchoolClassStudentListStudent;
