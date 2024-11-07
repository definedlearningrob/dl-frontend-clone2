import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

import styles from './GradingCheckinActions.module.sass';

type Props = {
  isGraded: boolean;
  loading: boolean;
  grade: (status: SUBMISSION_GRADE_STATUS) => Promise<void>;
};

const GradingCheckinActions = ({ isGraded, loading, grade }: Props) => {
  const [isEditing, setIsEditing] = useState(!isGraded);
  const { t } = useTranslation();

  const gradeSubmission = (positive: boolean) => async () => {
    await grade(positive ? SUBMISSION_GRADE_STATUS.ACCEPTED : SUBMISSION_GRADE_STATUS.NOT_ACCEPTED);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className={styles.actions}>
          <SharedButton
            className={styles.gradeButton}
            isLoading={loading}
            size='sm'
            variant='danger'
            onClick={gradeSubmission(false)}>
            {t('common.actions.reject')}
          </SharedButton>
          <SharedButton
            className={styles.gradeButton}
            isLoading={loading}
            size='sm'
            variant='success'
            onClick={gradeSubmission(true)}>
            {t('common.actions.accept')}
          </SharedButton>
        </div>
      ) : (
        <SharedButton size='sm' variant='primary-outlined' onClick={() => setIsEditing(true)}>
          {t('user.grading.edit')}
        </SharedButton>
      )}
    </div>
  );
};

export default GradingCheckinActions;
