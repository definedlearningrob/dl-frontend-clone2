import { useTranslation } from 'react-i18next';

import { ReactComponent as FacebookIcon } from '@shared/svg/facebook.svg';
import { ReactComponent as TwitterIcon } from '@shared/svg/twitter.svg';
import { SOCIAL_LINKS } from '@shared/resources/constants';

function SignInFooter() {
  const { t } = useTranslation();

  return (
    <footer className='signin__footer'>
      <div className='signin__footer-icon'>
        <a
          className='signin__footer__social-media-link'
          href={SOCIAL_LINKS.FACEBOOK}
          target='_blank'>
          <FacebookIcon className='choose-account__footer__social-media-icon' />
        </a>
      </div>
      <div className='signin__footer-icon'>
        <a
          className='signin__footer__social-media-link'
          href={SOCIAL_LINKS.TWITTER}
          target='_blank'>
          <TwitterIcon className='choose-account__footer__social-media-icon' />
        </a>
      </div>
      <p className='signin__footer__copyright-text'>
        {t('copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}

export default SignInFooter;
