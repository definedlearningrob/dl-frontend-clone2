import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

function StudentSignInWithAccessCodeForm() {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation('student');

  return (
    <>
      <Form data-testid='student-access-code-form'>
        <SharedFormTextInput label={t('signInWithAccessCode.form.accessLabel')} name='accessCode' />
        <SharedButton disabled={isSubmitting} type='submit' value='Login' variant='primary'>
          {t('signInWithAccessCode.form.submit')}
        </SharedButton>
      </Form>
    </>
  );
}

export default StudentSignInWithAccessCodeForm;
