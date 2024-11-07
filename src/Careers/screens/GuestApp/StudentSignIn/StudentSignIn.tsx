import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import SharedLoginDivider from '@dc/components/SignIn/LoginDivider/LoginDivider';
import StudentSignInForm from '@dc/components/Student/SignIn/Form/Form';
import UserSignInWelcomeBanner from '@dc/components/SignIn/WelcomeBanner/WelcomeBanner';
import { clearLoginError, loginAction } from '@dc/redux/session/actions';
import { ReactComponent as Clever } from '@dc/svg/clever_logo.svg';
import { ReactComponent as GoogleLogo } from '@dc/svg/google_logo.svg';
import { TRootState } from '@dc/redux/reducers';
import { LOCAL_STORAGE_COURSE_ID } from '@dc/resources/localStorageKeys';

import ArchivedStudent from '@shared/components/ArchivedStudent/ArchivedStudent';
import SharedButton from '@shared/components/Button/Button';
import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';
import { ReactComponent as Classlink } from '@shared/svg/classlink_logo.svg';
import useAllowLogin from '@shared/hooks/useAllowLogin';

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

  const initialLoginValues = { domain: '', login: '', password: '' };

  const validationSchema = Yup.object().shape({
    domain: Yup.string().required(t('validation.messages.required')),
    login: Yup.string().required(t('validation.messages.required')),
    password: Yup.string().required(t('validation.messages.required')),
  });

  const saveCourseInfo = () => {
    localStorage.setItem(LOCAL_STORAGE_COURSE_ID, shareId!);
  };

  const handleProviderSubmit = async (provider: TProvider) => {
    try {
      const emptyCredentials = {
        login: '',
        password: '',
      };

      if (shareId && loginConfig?.allowLogin) {
        saveCourseInfo();
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

      if (shareId && loginConfig?.allowLogin) {
        saveCourseInfo();
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
      backTo='/sign-in'
      headingText={t('student.signIn.heading')}
      showFooter={true}
      showLogo={true}>
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
        initialValues={initialLoginValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <StudentSignInForm />
      </Formik>
    </SignInWrapper>
  );
}

export default GuestAppStudentSignIn;
