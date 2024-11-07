import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import textLessonsQuery from '@dc/graphql/user/queries/textLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminLessonsFormItemsTextForm.propTypes = {
  errors: PropTypes.shape({
    content: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
  }),
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
  touched: PropTypes.shape({
    content: PropTypes.bool,
    displayName: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminLessonsFormItemsTextForm({ errors, id, touched, onCancel, submit }) {
  const [contentInput, , contentHelpers] = useField('content');
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  return (
    <div className='admin-form' data-testid='text-form'>
      <div className='admin-form__inputs-row'>
        <SharedFormTextInput
          data-testid='text-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
        <SharedFormTextInput
          data-testid='text-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedTextEditor
        data-testid='text-content-input'
        editorConfig={{ ...contentInput, onChange: contentHelpers.setValue }}
        errorMessage={touched.content && errors.content}
        isRequired={true}
        label={t('admin.lessons.items.text.content')}
      />
      {id && (
        <AffectedResources
          id={id}
          query={textLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <SharedButton
          data-testid='text-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          data-testid='text-form-submit'
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

export default AdminLessonsFormItemsTextForm;
