import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import SharedUploadInput from '@dc/shared/UploadInput/UploadInput';
import videoLessonsQuery from '@dc/graphql/user/queries/videoLessons';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminLessonsFormItemsVideoForm.propTypes = {
  disabledFileInput: PropTypes.bool,
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    videos: PropTypes.string,
  }),
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    name: PropTypes.bool,
    videos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  }),
  videoProgress: PropTypes.number,
};

function AdminLessonsFormItemsVideoForm({
  errors,
  id,
  touched,
  onCancel,
  submit,
  videoProgress,
  disabledFileInput,
}) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const [videoInput, , videoHelpers] = useField('videos');
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  useScrollToInvalidFormElement();

  return (
    <div className='admin-form' data-testid='video-form'>
      <div className='admin-form__inputs-row'>
        <SharedFormTextInput
          data-testid='video-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
        <SharedFormTextInput
          data-testid='video-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedTextEditor
        data-testid='video-description-input'
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        isRequired={true}
        label={t('common.fields.common.description')}
      />
      <SharedUploadInput
        data-testid='video-file-input'
        disabled={disabledFileInput}
        errorMessage={touched.videos && errors.videos}
        extensions={['.flv', '.avi', '.mp4']}
        inputConfig={{ ...videoInput, onChange: videoHelpers.setValue }}
        multiple={false}
        progress={videoProgress}
      />
      {id && (
        <AffectedResources
          id={id}
          query={videoLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <SharedButton
          data-testid='video-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          data-testid='lesson-item-form-submit'
          isLoading={isSubmitting}
          minWidth='lg'
          value='Save'
          variant='primary'
          onClick={submit}>
          {t('common.actions.save')}
        </SharedButton>
      </div>
    </div>
  );
}

export default AdminLessonsFormItemsVideoForm;
