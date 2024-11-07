import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import useAssessment from '@dc/hooks/useAssessment';
import useUserInfo from '@dc/hooks/useUserInfo';
import { APTITUDE_VARIABLES } from '@dc/resources/constants';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

OnboardingAssessmentNavigationQuitModal.propTypes = {
  isFirstAssessment: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function OnboardingAssessmentNavigationQuitModal({ isFirstAssessment, isOpen, onClose }) {
  const history = useHistory();
  const { saveProgress, isSaving } = useAssessment();
  const { t } = useTranslation();
  const {
    impersonateStop,
    logout,
    userInfo: { isImpersonated, uuid },
  } = useUserInfo();
  const isEmbedded = window.self !== window.top;
  const isAptitude = window.localStorage.getItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY);

  const handleDiscardAndLogout = () => {
    logout();
  };

  const handleDiscardAndGoBack = () => {
    if (isEmbedded && isAptitude) {
      window.localStorage.removeItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY);
      window.parent.postMessage(JSON.stringify({ function: 'backToProgram' }), '*');
    } else {
      history.push('/');
    }
  };

  const handleSaveGoBack = async () => {
    await saveProgress({ finished: false });
    if (isEmbedded && isAptitude) {
      window.localStorage.removeItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY);
      window.parent.postMessage(JSON.stringify({ function: 'backToProgram' }), '*');
    } else {
      history.push('/');
    }
  };

  const handleSaveAndLogout = async () => {
    await saveProgress({ finished: false, noRefetchQueries: true });
    handleDiscardAndLogout();
  };

  const stopImpersonate = async () => {
    try {
      const studentUuid = uuid;
      await impersonateStop();
      history.replace(`/students/${studentUuid}`);
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };

  const handleSaveAndStopImpersonate = async () => {
    await saveProgress({ finished: false, noRefetchQueries: true });
    stopImpersonate();
  };

  const handleDiscardAction = () => {
    if (isImpersonated) {
      return stopImpersonate();
    }

    isFirstAssessment ? handleDiscardAndLogout() : handleDiscardAndGoBack();
  };
  const handleSaveAction = () => {
    if (isImpersonated) {
      return handleSaveAndStopImpersonate();
    }

    isFirstAssessment ? handleSaveAndLogout() : handleSaveGoBack();
  };

  const buttonsTexts = useMemo(() => {
    const baseKey = 'student.onboarding.assessment.abort';

    if (isImpersonated) {
      return {
        discard: t(`${baseKey}.discardAndExitSession`),
        save: t(`${baseKey}.saveAndExitSession`),
      };
    }

    return isFirstAssessment
      ? { discard: t(`${baseKey}.discardAndLogOut`), save: t(`${baseKey}.saveAndLogOut`) }
      : { discard: t(`${baseKey}.discardAndGoBack`), save: t(`${baseKey}.saveAndGoBack`) };
  }, [isFirstAssessment, isImpersonated]);

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('student.onboarding.assessment.abort.unsavedChanges')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='course-unenroll-modal__description'>
          {isImpersonated
            ? t('student.onboarding.assessment.abort.saveDiscardExitSessionQuestion')
            : t('student.onboarding.assessment.abort.saveDiscardLogoutQuestion')}
        </p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          className='course-unenroll-modal__button'
          variant='primary-outlined'
          onClick={handleDiscardAction}>
          {buttonsTexts.discard}
        </SharedModal.Button>
        <SharedModal.Button
          className='course-unenroll-modal__button'
          isLoading={isSaving}
          variant='primary'
          onClick={handleSaveAction}>
          {buttonsTexts.save}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default OnboardingAssessmentNavigationQuitModal;
