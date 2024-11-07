import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

function UserSignInForm() {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  return (
    <Form className='flex flex-col gap-sm' data-testid='user-signin-form'>
      <SharedFormTextInput
        data-testid='login-input'
        label={t('user.signIn.form.usernameLabel')}
        name='login'
        placeholder={t('user.signIn.form.usernameLabel').toLowerCase()}
        size='lg'
      />
      <SharedFormTextInput
        data-testid='password-input'
        label={t('user.signIn.form.passwordLabel')}
        name='password'
        placeholder={t('user.signIn.form.passwordLabel').toLowerCase()}
        size='lg'
        type='password'
      />
      <SharedButton
        className='w-full my-sm'
        data-testid='login-submit'
        disabled={isSubmitting}
        isLoading={isSubmitting}
        size='lg'
        type='submit'
        value='Login'
        variant='primary'>
        {t('user.signIn.form.submit')}
      </SharedButton>
    </Form>
  );
}

export default UserSignInForm;
