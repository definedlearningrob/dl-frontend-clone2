import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import attachmentLessonsQuery from '@dc/graphql/user/queries/attachmentLessons';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import SharedUploadInput from '@dc/shared/UploadInput/UploadInput';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import Button from '@shared/components/Button/Button';

AdminLessonsFormItemsAttachmentForm.propTypes = {
  disabledFileInput: PropTypes.bool,
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    files: PropTypes.string,
    name: PropTypes.string,
  }),
  id: PropTypes.string,
  onCancel: PropTypes.func,
  onFileRemove: PropTypes.func,
  submit: PropTypes.func,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    files: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    name: PropTypes.bool,
  }),
};

function AdminLessonsFormItemsAttachmentForm({
  disabledFileInput,
  errors,
  id,
  touched,
  onCancel,
  onFileRemove,
  submit,
}) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const [filesInput, , filesHelpers] = useField('files');
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  useScrollToInvalidFormElement();

  return (
    <div className='admin-form' data-testid='attachment-form'>
      <div className='flex gap-sm mb-sm'>
        <SharedFormTextInput
          data-testid='attachment-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
        <SharedFormTextInput
          data-testid='attachment-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedTextEditor
        data-testid='attachment-description-input'
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        isRequired={true}
        label={t('common.fields.common.description')}
      />
      <SharedUploadInput
        data-testid='attachment-files-input'
        disabled={disabledFileInput}
        errorMessage={touched.files && errors.files}
        extensions={['.pdf', '.txt', '.xls']}
        inputConfig={{ ...filesInput, onChange: filesHelpers.setValue }}
        onRemove={onFileRemove}
      />
      {id && (
        <AffectedResources
          id={id}
          query={attachmentLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <Button
          data-testid='attachment-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </Button>
        <Button
          data-testid='attachment-form-submit'
          isLoading={isSubmitting}
          minWidth='lg'
          value='Save'
          variant='primary'
          onClick={submit}>
          {t('common.actions.save')}
        </Button>
      </div>
    </div>
  );
}

export default AdminLessonsFormItemsAttachmentForm;
