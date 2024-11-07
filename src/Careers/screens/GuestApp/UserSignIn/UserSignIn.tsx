import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SharedLoginDivider from '@dc/components/SignIn/LoginDivider/LoginDivider';
import UserSignInForm from '@dc/components/User/SignIn/Form/Form';
import UserSignInWelcomeBanner from '@dc/components/SignIn/WelcomeBanner/WelcomeBanner';
import { loginAction } from '@dc/redux/session/actions';
import { ReactComponent as Clever } from '@dc/svg/clever_logo.svg';
import { ReactComponent as GoogleLogo } from '@dc/svg/google_logo.svg';

import SharedButton from '@shared/components/Button/Button';
import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';
import { ReactComponent as Classlink } from '@shared/svg/classlink_logo.svg';

type TFormValues = {
  login: string;
  password: string;
};

type TProvider = 'google' | 'clever' | 'classLink';

function GuestAppUserSignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

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
      headingText={t('user.signIn.heading')}
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
        initialValues={{ login: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <UserSignInForm />
      </Formik>
    </SignInWrapper>
  );
}

export default GuestAppUserSignIn;
