import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

function UserSignInWithAccessCodeForm() {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  return (
    <>
      <Form data-testid='user-access-code-form'>
        <SharedFormTextInput
          label={t('user.signInWithAccessCode.form.accessLabel')}
          name='accessCode'
        />
        <SharedButton
          className='signin__submit'
          disabled={isSubmitting}
          size='lg'
          type='submit'
          value='Login'
          variant='primary'>
          {t('user.signInWithAccessCode.form.submit')}
        </SharedButton>
      </Form>
    </>
  );
}

export default UserSignInWithAccessCodeForm;
