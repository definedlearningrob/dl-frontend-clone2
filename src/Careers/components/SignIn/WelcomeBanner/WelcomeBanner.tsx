import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';

import { ReactComponent as Facebook } from '@shared/svg/facebook.svg';
import { ReactComponent as Twitter } from '@shared/svg/twitter.svg';
import { SOCIAL_LINKS } from '@shared/resources/constants';

import '@dc/components/SignIn/WelcomeBanner/WelcomeBanner.sass';

type Props = {
  className: string;
};

function SignInWelcomeBanner({ className }: Props) {
  const { t } = useTranslation();
  const classes = cx('signin-banner', { [`signin-banner-${className}`]: className });

  return (
    <aside className={classes} data-testid='welcome-banner'>
      <LogoType className='signin-banner__logo' />
      <h1
        className='signin-banner__heading'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: t('chooseAccount.welcome') }}
      />
      <div className='signin-banner__hint'>
        <p>{t('chooseAccount.loginHelp')}</p>
        <p>
          <a
            className='signin-banner__hint__link'
            href='https://www.definedlearning.com/what-we-offer/career-based-learning/'>
            {t('chooseAccount.contactUs')}
          </a>
        </p>
      </div>
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
