import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import Button from '@shared/components/Button/Button';

export const IFrameFilledForm = () => {
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
          <div className='flex justify-between items-end relative'>
            {currentSlide?.iframeUrl && (
              <button
                className='text-xxs absolute text-danger-500 font-bold right-0 top-0 border border-danger-500 rounded-xs p-xxs'
                type='button'
                onClick={handleClear}>
                {t('admin.tasks.presentation.clear')}
              </button>
            )}
            <SharedFormTextInput
              className='mr-sm'
              label={t('admin.tasks.presentation.iframeUrlLabel')}
              name='url'
            />
            <div>
              <Button size='md' type='submit' variant='primary'>
                {t('common.actions.submit')}
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
};
