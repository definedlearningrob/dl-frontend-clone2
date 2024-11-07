import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import SignInSupport from '@pbl/components/SignIn/Support/Support';
import SignInWelcomeBanner from '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner';

import Icon from '@shared/components/Icon/Icon';
import { ReactComponent as FacebookIcon } from '@shared/svg/facebook.svg';
import { ReactComponent as StudentIcon } from '@shared/svg/student.svg';
import { ReactComponent as TeacherIcon } from '@shared/svg/educator.svg';
import { ReactComponent as TwitterIcon } from '@shared/svg/twitter.svg';
import { SOCIAL_LINKS } from '@shared/resources/constants';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';

import '@pbl/screens/GuestApp/ChooseAccount/ChooseAccount.sass';

function GuestAppChooseAccount() {
  const { t } = useTranslation();
  const { localesToSelect, selectedLocale, setLanguage } = useLocalize();

  return (
    <div className='choose-account'>
      <SignInWelcomeBanner className='bg-choose-account' />
      <div className='absolute top-md right-[80px]'>
        <LanguageSwitcher
          languages={localesToSelect}
          selectedLanguage={selectedLocale}
          setLanguage={setLanguage}
        />
      </div>
      <div className='choose-account__content-wrapper'>
        <div className='choose-account__content'>
          {/*<LogoType className='choose-account__logo'/>*/}
          <h1 className='choose-account__title'>{t('chooseAccount.title')}</h1>
          <div className='choose-account__elements'>
            <Link className='choose-account__card' to='/sign-in/students'>
              <div className='choose-account__card-icon'>
                <Icon icon={<StudentIcon />} size='md' />
              </div>
              <div>
                <span className='choose-account__card-title'>{t('chooseAccount.student')}</span>
                <span className='choose-account__card-info'>{t('chooseAccount.studentInfo')}</span>
              </div>
            </Link>
            <Link className='choose-account__card' to='/sign-in/users'>
              <div className='choose-account__card-icon'>
                <Icon icon={<TeacherIcon />} size='md' />
              </div>
              <div>
                <span className='choose-account__card-title'>{t('chooseAccount.user')}</span>
                <span className='choose-account__card-info'>{t('chooseAccount.userInfo')}</span>
              </div>
            </Link>
          </div>
          <SignInSupport
            className='choose-account__link'
            externalLink={true}
            linkText={t('chooseAccount.help')}
            path='https://www.definedlearning.com/contact-us/'
            plainText={t('chooseAccount.trouble')}
          />
          <footer className='choose-account__footer'>
            <div className='choose-account__footer-icon'>
              <a
                className='choose-account__footer__social-media-link'
                href={SOCIAL_LINKS.FACEBOOK}
                target='_blank'>
                <FacebookIcon className='choose-account__footer__social-media-icon' />
              </a>
            </div>
            <div className='choose-account__footer-icon'>
              <a
                className='choose-account__footer__social-media-link'
                href={SOCIAL_LINKS.TWITTER}
                target='_blank'>
                <TwitterIcon className='choose-account__footer__social-media-icon' />
              </a>
            </div>
            <p className='choose-account__footer__copyright-text'>
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default GuestAppChooseAccount;
