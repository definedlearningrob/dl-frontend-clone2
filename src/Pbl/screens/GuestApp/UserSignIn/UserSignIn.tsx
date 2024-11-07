import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SharedLoginDivider from '@pbl/components/SignIn/LoginDivider/LoginDivider';
import SignInSupport from '@pbl/components/SignIn/Support/Support';
import UserSignInForm from '@pbl/components/User/SignIn/Form/Form';
import UserSignInWelcomeBanner from '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner';
import { loginAction } from '@pbl/redux/session/actions';

import SharedButton from '@shared/components/Button/Button';
import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';
import { ReactComponent as Classlink } from '@shared/svg/classlink_logo.svg';
import { ReactComponent as Clever } from '@shared/svg/clever_logo.svg';
import { ReactComponent as FacebookIcon } from '@shared/svg/facebook.svg';
import { ReactComponent as GoogleLogo } from '@shared/svg/google_logo.svg';
import { ReactComponent as TwitterIcon } from '@shared/svg/twitter.svg';
import { SOCIAL_LINKS } from '@shared/resources/constants';

type TFormValues = {
  login: string;
  password: string;
};

type TProvider = 'google' | 'clever' | 'classLink';

function GuestAppUserSignIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t('validation.messages.required')),
    password: Yup.string().required(t('validation.messages.required')),
  });

  const handleProviderSubmit = (provider: TProvider) => {
    try {
      const emptyCredentials = {
        login: '',
        password: '',
      };

      dispatch(loginAction({ provider, ...emptyCredentials, type: 'user' }));
      // Jest mocking issue
    } catch (e) {}
  };

  const handleSubmit = async (
    values: TFormValues,
    { setErrors }: { setErrors?: Function } = {}
  ): Promise<void> => {
    try {
      const emptyProvider = {
        provider: null,
      };
      const user = await dispatch(loginAction({ ...emptyProvider, ...values, type: 'user' }));

      if (!user && setErrors)
        setErrors({
          login: t('user.signIn.form.credentialsError'),
          password: t('user.signIn.form.credentialsError'),
        });

      if (user !== undefined) {
        history.replace('/');
      }

      // Jest mocking issue
    } catch (e) {}
  };
  const loginWithGoogle = () => handleProviderSubmit('google');
  const loginWithClever = () => handleProviderSubmit('clever');
  const loginWithClassLink = () => handleProviderSubmit('classLink');

  return (
    <SignInWrapper
      WelcomeBanner={UserSignInWelcomeBanner}
      backTo='/'
      headingText={t('user.signIn.heading')}>
      <div className='signin__vendor-actions'>
        <SharedButton Icon={GoogleLogo} className='signin__vendor-button' onClick={loginWithGoogle}>
          <span className='signin__vendor-text-short'>{t('user.signIn.google')}</span>
          <span className='signin__vendor-text-long'>{t('user.signIn.googleText')}</span>
        </SharedButton>
        <SharedButton Icon={Clever} className='signin__vendor-button' onClick={loginWithClever}>
          <span className='signin__vendor-text-short'>{t('user.signIn.clever')}</span>
          <span className='signin__vendor-text-long'>{t('user.signIn.cleverText')}</span>
        </SharedButton>
        <SharedButton
          Icon={Classlink}
          className='signin__vendor-button'
          onClick={loginWithClassLink}>
          <span className='signin__vendor-text-short'>{t('user.signIn.classLink')}</span>
          <span className='signin__vendor-text-long'>{t('user.signIn.classLinkText')}</span>
        </SharedButton>
      </div>
      <SharedLoginDivider />
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <UserSignInForm />
      </Formik>
      <div className='signin__links-wrapper'>
        {/* TODO Temoprary not visible - client request */}
        {/*  <SignInSupport
          className='signin__link'
          linkText={t('user.signIn.register.link')}
          path='/'
          plainText={t('user.signIn.register.text')}
        /> */}
        <SignInSupport
          className='signin__link'
          externalLink={true}
          linkText={t('user.signIn.help.link')}
          path='https://www.definedlearning.com/contact-us/'
          plainText={t('user.signIn.help.text')}
        />
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
      </div>
    </SignInWrapper>
  );
}

export default GuestAppUserSignIn;
