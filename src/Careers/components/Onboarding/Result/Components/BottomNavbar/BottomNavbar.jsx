import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

function OnboardingResultComponentsBottomNavbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeComponent = pathname.split('/').pop();

  const prevButtonConfig = {
    preferences: {
      link: '/choose-pathway',
    },
    interests: {
      link: '/choose-pathway/components/preferences',
    },
    workvalues: {
      link: '/choose-pathway/components/interests',
    },
  }[activeComponent];

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
    <nav className='onboarding-components-bottom-navigation'>
      <Link className='onboarding-components-bottom-navigation__link' to={prevButtonConfig.link}>
        <SharedButton
          className='onboarding-components-bottom-navigation__button -outlined'
          variant='primary-outlined'>
          {t('student.onboarding.components.navigation.back')}
        </SharedButton>
      </Link>
      <Link className='onboarding-components-bottom-navigation__link' to={nextButtonConfig.link}>
        <SharedButton className='onboarding-components-bottom-navigation__button' variant='primary'>
          {nextButtonConfig.text}
        </SharedButton>
      </Link>
      <div className='onboarding-components-bottom-navigation__background' />
    </nav>
  );
}

export default OnboardingResultComponentsBottomNavbar;
