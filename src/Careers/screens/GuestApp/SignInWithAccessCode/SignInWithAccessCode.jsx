import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignInSupport from '@dc/components/SignIn/Support/Support';
import UserSignInWelcomeBanner from '@dc/components/SignIn/WelcomeBanner/WelcomeBanner';
import UserSignInWithAccessCodeForm from '@dc/components/User/SignInWithAccessCode/Form/Form';
import { loginAction } from '@dc/redux/session/actions';

import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';

function GuestAppSignInWithAccessCode() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    accessCode: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = (provider) => (values) => {
    try {
      dispatch(loginAction({ provider, ...values, type: 'student' }));
      history.replace('/');
      // Jest mocking issue
    } catch (e) {}
  };

  return (
    <SignInWrapper
      WelcomeBanner={UserSignInWelcomeBanner}
      backTo='/sign-in'
      headingText={t('user.signInWithAccessCode.heading')}>
      <Formik
        initialValues={{ accessCode: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit()}>
        {({ errors, touched }) => (
          <UserSignInWithAccessCodeForm errors={errors} touched={touched} />
        )}
      </Formik>
      <SignInSupport
        linkText={t('user.signInWithAccessCode.trial.link')}
        path='/'
        plainText={t('user.signInWithAccessCode.trial.text')}
      />
    </SignInWrapper>
  );
}

export default GuestAppSignInWithAccessCode;
