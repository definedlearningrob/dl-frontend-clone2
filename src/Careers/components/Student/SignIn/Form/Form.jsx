import { useTranslation } from 'react-i18next';
import { Form, useFormikContext } from 'formik';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

function StudentSignInForm() {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  return (
    <>
      <Form className='flex flex-col gap-sm' data-testid='student-signin-form'>
        <SharedFormTextInput
          data-testid='domain-input'
          label={t('student.signIn.form.domainLabel')}
          name='domain'
          placeholder={t('student.signIn.form.domainLabel').toLowerCase()}
          size='lg'
        />
        <SharedFormTextInput
          data-testid='login-input'
          label={t('student.signIn.form.usernameLabel')}
          name='login'
          placeholder={t('student.signIn.form.usernameLabel').toLowerCase()}
          size='lg'
        />
        <SharedFormTextInput
          data-testid='password-input'
          label={t('student.signIn.form.passwordLabel')}
          name='password'
          placeholder={t('student.signIn.form.passwordLabel').toLowerCase()}
          size='lg'
          type='password'
        />
        <SharedButton
          className='w-full'
          data-testid='login-submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          size='lg'
          type='submit'
          value='Login'
          variant='primary'>
          {t('student.signIn.form.submit')}
        </SharedButton>
      </Form>
    </>
  );
}

export default StudentSignInForm;
