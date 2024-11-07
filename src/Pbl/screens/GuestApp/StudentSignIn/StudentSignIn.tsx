import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import * as Yup from 'yup';

import SharedLoginDivider from '@pbl/components/SignIn/LoginDivider/LoginDivider';
import SignInSupport from '@pbl/components/SignIn/Support/Support';
import StudentSignInForm from '@pbl/components/Student/SignIn/Form/Form';
import UserSignInWelcomeBanner from '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner';
import { clearLoginError, loginAction } from '@pbl/redux/session/actions';
import { TRootState } from '@pbl/redux/reducers';
import {
  LOCAL_STORAGE_ORIGINATOR,
  LOCAL_STORAGE_PROJECT_FORCE_ASSIGNMENT,
  LOCAL_STORAGE_PROJECT_ID,
  LOCAL_STORAGE_PROJECT_TIMESTAMP,
} from '@pbl/resources/localStorageKeys';

import useAllowLogin from '@shared/hooks/useAllowLogin';
import ArchivedStudent from '@shared/components/ArchivedStudent/ArchivedStudent';
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
  domain: string;
};

type TProvider = 'google' | 'clever' | 'classLink';

function GuestAppStudentSignIn() {
  const { t } = useTranslation();
  const { loginError } = useSelector((state: TRootState) => state.session);
  const { loginConfig, shareId } = useAllowLogin();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAccountArchived = useMemo(() => loginError.accountArchived || false, [loginError]);

  const validationSchema = Yup.object().shape({
    domain: Yup.string().required(t('validation.messages.required')),
    login: Yup.string().required(t('validation.messages.required')),
    password: Yup.string().required(t('validation.messages.required')),
  });

  const saveProjectInfo = () => {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_ID, shareId!);
    localStorage.setItem(LOCAL_STORAGE_ORIGINATOR, loginConfig?.creatorId!);
    localStorage.setItem(LOCAL_STORAGE_PROJECT_FORCE_ASSIGNMENT, JSON.stringify(true));
    localStorage.setItem(LOCAL_STORAGE_PROJECT_TIMESTAMP, JSON.stringify(Date.now()));
  };

  const handleProviderSubmit = (provider: TProvider) => {
    try {
      const emptyCredentials = {
        login: '',
        password: '',
      };
      if (loginConfig?.allowLogin === true && shareId) {
        saveProjectInfo();
      }
      dispatch(loginAction({ provider, ...emptyCredentials, type: 'student' }));
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

      if (loginConfig?.allowLogin === true && shareId) {
        saveProjectInfo();
      }

      const student = await dispatch(loginAction({ ...emptyProvider, ...values, type: 'student' }));

      if (!isAccountArchived && !student && setErrors)
        setErrors({
          login: t('student.signIn.form.credentialsError'),
          password: t('student.signIn.form.credentialsError'),
          domain: t('student.signIn.form.credentialsError'),
        });

      if (!isAccountArchived && student !== undefined) {
        history.replace('/');
      }

      // Jest mocking issue
    } catch (e) {}
  };

  const loginWithGoogle = () => handleProviderSubmit('google');
  const loginWithClever = () => handleProviderSubmit('clever');
  const loginWithClassLink = () => handleProviderSubmit('classLink');

  if (isAccountArchived) {
    return (
      <SignInWrapper WelcomeBanner={UserSignInWelcomeBanner} showBackButton={false}>
        <ArchivedStudent clearLoginError={clearLoginError} message={loginError.message} />
      </SignInWrapper>
    );
  }

  return (
    <SignInWrapper
      WelcomeBanner={UserSignInWelcomeBanner}
      backTo='/'
      headingText={t('student.signIn.heading')}>
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
        initialValues={{ domain: '', login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <StudentSignInForm />
      </Formik>
      <div className='signin__links-wrapper'>
        {/* TODO Temoprary not visible - client request */}
        {/* <SignInSupport
          className='signin__link'
          linkText={t('student.signIn.register.link')}
          path='/'
          plainText={t('student.signIn.register.text')}
        /> */}
        <SignInSupport
          className='signin__link'
          externalLink={true}
          linkText={t('student.signIn.help.link')}
          path='https://www.definedlearning.com/contact-us/'
          plainText={t('student.signIn.help.text')}
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

export default GuestAppStudentSignIn;
