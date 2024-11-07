import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ArrowBackward } from '@shared/svg/arrow_backward.svg';

// TODO - MAKE SHARED COMPONENT FOR WHOLE ASSESSNMENT SCOPE
function OnboardingResultComponentsTopNavbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeComponent = pathname.split('/').pop();

  const nextButtonConfig = {
    preferences: {
      link: '/choose-pathway/components/interests',
      text: t('student.onboarding.components.navigation.next'),
    },
    interests: {
      link: '/choose-pathway/components/workvalues',
      text: t('student.onboarding.components.navigation.next'),
    },
    workvalues: {
      link: '/choose-pathway',
      text: t('student.onboarding.components.navigation.chooseYourPathway'),
    },
  }[activeComponent];

  return (
    <nav className='onboarding-components-top-navigation'>
      <Link className='onboarding-components-top-navigation__backward-button' to='/choose-pathway'>
        <DeprecatedIconButton
          className='onboarding-components-top-navigation__backward-button-icon'
          icon={<ArrowBackward />}
        />
        <span className='onboarding-components-top-navigation__backward-button-text'>
          {t('student.onboarding.components.navigation.backToResults')}
        </span>
      </Link>
      <Link to={nextButtonConfig.link}>
        <SharedButton
          className='onboarding-components-top-navigation__button'
          variant='primary-outlined'>
          {nextButtonConfig.text}
        </SharedButton>
      </Link>
    </nav>
  );
}

export default OnboardingResultComponentsTopNavbar;
