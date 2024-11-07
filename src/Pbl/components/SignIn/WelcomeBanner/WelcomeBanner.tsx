import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoType } from '@pbl/svg/Learning_logotype.svg';

import { cleanInjection } from '@shared/utils/cleanInjection';
import { ReactComponent as Facebook } from '@shared/svg/facebook.svg';
import { ReactComponent as Twitter } from '@shared/svg/twitter.svg';
import { SOCIAL_LINKS } from '@shared/resources/constants';

import '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner.sass';

type Props = {
  className: string;
};

function SignInWelcomeBanner({ className }: Props) {
  const { t } = useTranslation();
  const classes = cx('signin-banner', { [`signin-banner-${className}`]: className });

  return (
    <aside className={classes} data-testid='welcome-banner'>
      <LogoType className='signin-banner__logo' />
      <h1 className='signin-banner__heading'>{t('chooseAccount.welcome')}</h1>
      <p className='signin-banner__hint'>
        {t('chooseAccount.loginHelp')}{' '}
        <span
          className='signin-banner__visit'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={cleanInjection(t('chooseAccount.visit'))}
        />
        <a
          className='signin-banner__hint__link'
          href='https://www.definedlearning.com/what-we-offer/career-based-learning/'>
          <u>{t('chooseAccount.contactUs')}</u>
        </a>
      </p>
      <footer className='signin-banner__footer'>
        <a
          className='signin-banner__social-media-link'
          href={SOCIAL_LINKS.FACEBOOK}
          target='_blank'>
          <Facebook className='signin-banner__social-media-icon' />
        </a>
        <a className='signin-banner__social-media-link' href={SOCIAL_LINKS.TWITTER} target='_blank'>
          <Twitter className='signin-banner__social-media-icon' />
        </a>
        <p className='signin-banner__copyright-text'>
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </aside>
  );
}

export default SignInWelcomeBanner;
