import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikConfig } from 'formik';

import type { TTaskPresentationVideo } from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

import styles from './UrlForm.module.sass';

type Props = {
  onClear: () => void;
  onSubmit: FormikConfig<{ url: string }>['onSubmit'];
  savingVideo: boolean;
  video?: TTaskPresentationVideo;
};

function AdminTasksPresentationBuilderSettingsElementsVideoVideoUploadUrlForm({
  onClear,
  onSubmit,
  savingVideo,
  video,
}: Props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    url: Yup.string().required(t('validation.messages.required')),
  });

  const initialValues = { url: video?.videoUrl || '' };

  const handleClear = () => onClear();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <Form>
        <div className='flex justify-between items-end gap-xxs relative'>
          {video && video.videoUrl && (
            <button className={styles.clear} type='button' onClick={handleClear}>
              {t('admin.tasks.presentation.clear')}
            </button>
          )}
          <SharedFormTextInput label={t('admin.tasks.presentation.videoUrlLabel')} name='url' />
          <SharedButton isLoading={!!savingVideo} type='submit' variant='primary'>
            {t('common.actions.submit')}
          </SharedButton>
        </div>
      </Form>
    </Formik>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsVideoVideoUploadUrlForm;
