import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import SignInSupport from '@pbl/components/SignIn/Support/Support';
import UserSignInWelcomeBanner from '@pbl/components/SignIn/WelcomeBanner/WelcomeBanner';
import UserSignInWithAccessCodeForm from '@pbl/components/User/SignInWithAccessCode/Form/Form';

import SignInWrapper from '@shared/components/SignInWrapper/SignInWrapper';

function GuestAppSignInWithAccessCode() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    accessCode: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = () => {
    try {
      history.replace('/');
      // Jest mocking issue
    } catch (e) {}
  };

  return (
    <SignInWrapper
      WelcomeBanner={UserSignInWelcomeBanner}
      backTo='/'
      headingText={t('user.signInWithAccessCode.heading')}>
      <Formik
        initialValues={{ accessCode: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <UserSignInWithAccessCodeForm />
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
