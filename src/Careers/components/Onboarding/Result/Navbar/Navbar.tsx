import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useUserInfo from '@dc/hooks/useUserInfo';
import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { callToast } from '@shared/components/Toaster/Toaster';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';

type Props = {
  bottom: boolean;
};

function AssessmentPathwayNavbar({ bottom }: Props) {
  const { t } = useTranslation();
  const { localesToSelect, selectedLocale, setLanguage } = useLocalize();
  const {
    impersonateStop,
    logout,
    userInfo: {
      hasCompletedOnboarding,
      isImpersonated,
      firstName,
      lastName,
      settings: { onboardingEnabled },
      uuid,
    },
  } = useUserInfo<TStudentInfo>();
  const history = useHistory();

  const handleClick = () => {
    if (hasCompletedOnboarding || !onboardingEnabled) {
      history.push('/');
    } else {
      logout();
    }
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

  return (
    <>
      {isImpersonated && !bottom && (
        <div className='assessment__impersonating-header'>
          {t('student.onboarding.assessment.impersonating', {
            name: `${firstName} ${lastName}`,
          })}
          <button className='assessment__impersonating-button' onClick={stopImpersonate}>
            {t('appHeader.exitSession')}
          </button>
        </div>
      )}
      <nav className='assessment__navbar' data-testid='onboarding-result-nav'>
        <SharedIcon className='assessment__logo' icon={<LogoType />} />
        <span className='assessment__navbar-title'>
          {t('student.onboarding.assessment.result.title')}
        </span>
        <div className='flex gap-xs items-center'>
          {!bottom && (
            <LanguageSwitcher
              languages={localesToSelect}
              selectedLanguage={selectedLocale}
              setLanguage={setLanguage}
            />
          )}
          <SharedButton
            className='assessment__navbar-button'
            variant='primary'
            onClick={handleClick}>
            <>
              {t(
                `student.onboarding.assessment.result.${
                  hasCompletedOnboarding || !onboardingEnabled ? 'backToDashboard' : 'logout'
                }`
              )}
            </>
          </SharedButton>
        </div>
      </nav>
    </>
  );
}

export default AssessmentPathwayNavbar;
