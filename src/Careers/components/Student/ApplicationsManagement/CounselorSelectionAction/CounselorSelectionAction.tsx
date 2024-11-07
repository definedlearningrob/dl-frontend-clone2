import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash-es/isEmpty';

import { SelectCounselorModal } from '@dc/components/Student/ApplicationsManagement/SelectCounselorModal';
import styles from '@dc/components/Student/ApplicationsManagement/ApplicationsManagement.module.sass';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { Tooltip } from '@shared/components/Tooltip';
import SharedButton from '@shared/components/Button/Button';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const CounselorSelectionAction = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  if (!userInfo) return null;

  const {
    commonAppData: { canChangeCounselor, currentCounselor, hasCounselorInvited },
    isImpersonated,
  } = userInfo;

  const [isCounselorModalOpen, toggleIsCounselorModalOpen] = useToggle(false);
  const hasSelectedCounselor = !isEmpty(currentCounselor);
  const buttonSize = isFullHD ? 'md' : 'sm';

  if (!hasSelectedCounselor) {
    return null;
  }

  if (hasCounselorInvited && !isImpersonated) {
    return (
      <Badge type='success'>{t('student.postSecondary.applicationsSection.modal.submitted')}</Badge>
    );
  }

  if (!hasCounselorInvited && !isImpersonated) {
    return (
      <>
        <SharedButton
          className={styles.sharedButton}
          size={buttonSize}
          variant='primary'
          onClick={toggleIsCounselorModalOpen}>
          {t('student.postSecondary.applicationsSection.modal.submitCounselor')}
        </SharedButton>
        <SelectCounselorModal
          closeModal={toggleIsCounselorModalOpen}
          isOpen={isCounselorModalOpen}
        />
      </>
    );
  }

  const impersonatedActionButton = hasCounselorInvited
    ? t('student.postSecondary.applicationsSection.modal.changeCounselor')
    : t('student.postSecondary.applicationsSection.modal.submitCounselor');

  return (
    <div>
      <Tooltip
        disabled={canChangeCounselor}
        message={t('student.postSecondary.applicationsSection.cantChangeCounselorMessage')}>
        <SharedButton
          className={styles.sharedButton}
          disabled={!canChangeCounselor}
          size={buttonSize}
          variant='primary'
          onClick={toggleIsCounselorModalOpen}>
          {impersonatedActionButton}
        </SharedButton>
      </Tooltip>

      <SelectCounselorModal closeModal={toggleIsCounselorModalOpen} isOpen={isCounselorModalOpen} />
    </div>
  );
};
