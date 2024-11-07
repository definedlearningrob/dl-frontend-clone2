import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

import styles from './IFrameForm.module.sass';

function AdminTasksPresentationBuilderSettingsElementsIFrameForm() {
  const { currentSlide, handleUpdateSlide } = usePresentationBuilder();
  const { t } = useTranslation();

  const handleClear = () => {
    // First is null because this function is used also as event handler and event is first argument
    handleUpdateSlide(null, { iframeUrl: '' });
  };

  const handleUrlSubmit = async (values: { url: string }) => {
    handleUpdateSlide(null, { iframeUrl: values.url });
  };

  const validationSchema = Yup.object().shape({
    url: Yup.string().required(t('validation.messages.required')),
  });

  const initialValues = { url: currentSlide?.iframeUrl || '' };

  return (
    <section>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUrlSubmit}>
        <Form>
          <div className={styles.container}>
            {currentSlide?.iframeUrl && (
              <button className={styles.clear} type='button' onClick={handleClear}>
                {t('admin.tasks.presentation.clear')}
              </button>
            )}
            <SharedFormTextInput label={t('admin.tasks.presentation.iframeUrlLabel')} name='url' />
            <SharedButton size='sm' type='submit' variant='primary'>
              {t('common.actions.submit')}
            </SharedButton>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsIFrameForm;
