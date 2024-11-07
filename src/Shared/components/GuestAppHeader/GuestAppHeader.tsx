import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BackNavButton } from '@dc/shared/BackNavButton/BackNavButton';

import useAllowLogin from '@shared/hooks/useAllowLogin';
import SharedButton from '@shared/components/Button/Button';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';

const GuestAppHeader = () => {
  const { loginConfig } = useAllowLogin();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { backNavButton } = useNavigation();
  const { selectedLocale, localesToSelect, setLanguage } = useLocalize();
  const isSharedProject = location.pathname.match(/^\/(shared)\/.+\/(projects)\//gi) !== null;

  const goToLogin = () => {
    history.push('/sign-in/students?allowLogin=true');
  };

  return (
    <div
      className='flex justify-between items-center bg-neutral-200 h-lg px-base xxxl:px-md sticky top-0 z-lower'
      data-testid='header-desktop'>
      {backNavButton.show && (
        <BackNavButton text={backNavButton.text} onBack={backNavButton.callback} />
      )}
      <div className='ms-auto flex items-center gap-xs'>
        {isSharedProject && (
          <LanguageSwitcher
            languages={localesToSelect}
            selectedLanguage={selectedLocale}
            setLanguage={setLanguage}
          />
        )}
        {loginConfig?.allowLogin && (
          <SharedButton variant='primary' onClick={goToLogin}>
            {t('appHeader.login')}
          </SharedButton>
        )}
      </div>
    </div>
  );
};

export default GuestAppHeader;
