import isEmpty from 'lodash-es/isEmpty';
import { useTranslation } from 'react-i18next';

import useUserInfo from '@dc/hooks/useUserInfo';
import { ActionableSection } from '@dc/components/Student/ApplicationsManagement/ActionableSection';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { CounselorSelectionAction } from '@dc/components/Student/ApplicationsManagement/CounselorSelectionAction/CounselorSelectionAction';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as CounselorIcon } from '@shared/svg//user_outlined.svg';
import { useMessaging } from '@shared/hooks/useMessaging';

import styles from '../ApplicationsManagement.module.sass';

export const CounselorCard = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TStudentInfo>();

  if (!userInfo) return null;

  const {
    commonAppData: {
      canSelectCounselor,
      currentCounselor,
      hasCounselorInvited,
      hasAccountConnected,
    },
  } = userInfo;

  const { setMessagingState, messagingState } = useMessaging();

  if (!hasAccountConnected || !canSelectCounselor) {
    return null;
  }

  const hasSelectedCounselor = !isEmpty(currentCounselor);
  const canSubmitCounselor = hasSelectedCounselor && !hasCounselorInvited;

  const counselorName = [currentCounselor?.firstName, currentCounselor?.lastName]
    .filter(Boolean)
    .join(' ');

  const handleContact = () => setMessagingState({ ...messagingState, show: true });

  const selectCounselorTitle = t('student.postSecondary.applicationsSection.noCounselorText');
  const submitCounselorTitle = t('student.postSecondary.applicationsSection.submitCounselorTitle', {
    counselorName,
  });
  const assignedCounselorTitle = t(
    'student.postSecondary.applicationsSection.assignedCounselorTitle',
    { counselorName }
  );
  const submittedCounselorTitle = t(
    'student.postSecondary.applicationsSection.invitedCounselorTitle',
    { counselorName }
  );

  const actionableSectionTitle = () => {
    if (canSubmitCounselor) return submitCounselorTitle;

    if (hasCounselorInvited) return submittedCounselorTitle;

    if (hasSelectedCounselor) return assignedCounselorTitle;

    return selectCounselorTitle;
  };

  const actionableSectionDescription = () => {
    if (canSubmitCounselor) {
      return t('student.postSecondary.applicationsSection.submitCounselorDescription');
    }

    if (hasCounselorInvited) {
      return (
        <>
          {t('student.postSecondary.applicationsSection.submittedCounselorDescription')}{' '}
          <SharedButton
            className='!inline !text-xs xxxl:!text-sm'
            variant='link'
            onClick={handleContact}>
            {t('student.postSecondary.applicationsSection.contactWithTeacher')}
          </SharedButton>
        </>
      );
    }

    if (hasSelectedCounselor) {
      return t('student.postSecondary.applicationsSection.assignedCounselorDescription');
    }

    return (
      <>
        {t('student.postSecondary.applicationsSection.noCounselorDescription')}{' '}
        <SharedButton
          className='!inline !text-xs xxxl:!text-sm'
          variant='link'
          onClick={handleContact}>
          {t('student.postSecondary.applicationsSection.contactWithTeacher')}
        </SharedButton>
      </>
    );
  };

  return (
    <>
      <ActionableSection
        action={<CounselorSelectionAction />}
        className='!rounded-t-none'
        contentClassName='border-t border-neutral-300'
        description={actionableSectionDescription()}
        icon={
          <div className={styles.iconBox}>
            <SharedIcon icon={<CounselorIcon />} size='md' />
          </div>
        }
        title={actionableSectionTitle()}
      />
    </>
  );
};
