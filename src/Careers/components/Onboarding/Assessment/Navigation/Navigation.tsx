import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import QuitModal from '@dc/components/Onboarding/Assessment/Navigation/QuitModal/QuitModal';
import useAssessment from '@dc/hooks/useAssessment';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';
import { ReadSpeaker } from '@shared/components/ReadSpeaker/ReadSpeaker';

type Props = {
  isSaving?: boolean;
};

function OnboardingAssessmentNavigation({ isSaving }: Props) {
  const { t } = useTranslation();
  const { localesToSelect, selectedLocale, setLanguage } = useLocalize();
  const {
    assessment: {
      attempt: { assessmentType },
    },
  } = useAssessment();
  const {
    userInfo: {
      hasCompletedOnboarding,
      isImpersonated,
      firstName,
      lastName,
      settings: { onboardingEnabled },
    },
  } = useUserInfo<TStudentInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderActions = () => {
    if (assessmentType === ASSESSMENT_TYPES.HIGH_SCHOOL) {
      return hasCompletedOnboarding || !onboardingEnabled
        ? t('student.onboarding.assessment.abort.backToDashboard')
        : t('student.onboarding.assessment.abort.logout');
    }

    if (assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL) {
      return t('student.onboarding.assessment.abort.saveProgress');
    }
  };

  return (
    <>
      {isImpersonated && (
        <div className='assessment__impersonating-header'>
          {t('student.onboarding.assessment.impersonating', {
            name: `${firstName} ${lastName}`,
          })}
          <button className='assessment__impersonating-button' onClick={toggleModal}>
            {t('appHeader.exitSession')}
          </button>
        </div>
      )}
      <header className='assessment__navbar'>
        <SharedButton isLoading={isSaving} variant='primary-outlined' onClick={toggleModal}>
          <>{renderActions()}</>
        </SharedButton>
        <div className='flex gap-sm items-center'>
          <SharedIcon className='h-base border-r border-neutral-300 pr-sm' icon={<LogoType />} />
          <p className='m-0 font-bold text-xs'>{t('student.onboarding.assessment.title')}</p>
        </div>
        <div className='[&>*]:mb-0 [&_a>span]:!pl-xs'>
          <ReadSpeaker />
        </div>
        <div>
          <LanguageSwitcher
            languages={localesToSelect}
            selectedLanguage={selectedLocale}
            setLanguage={setLanguage}
          />
        </div>
      </header>
      <QuitModal
        isFirstAssessment={!hasCompletedOnboarding && onboardingEnabled}
        isOpen={isModalOpen}
        onClose={toggleModal}
      />
    </>
  );
}

export default OnboardingAssessmentNavigation;
