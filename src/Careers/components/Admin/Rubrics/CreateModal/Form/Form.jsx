import PropTypes from 'prop-types';
import { Form, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import SharedModal from '@shared/components/Modal/Modal';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminRubricsCreateModalForm.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
  }),
  onClose: PropTypes.func,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminRubricsCreateModalForm({ errors, onClose, touched }) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  return (
    <Form className='flex flex-col gap-sm'>
      <SharedFormTextInput isRequired={true} label={t('common.fields.common.name')} name='name' />
      <SharedRoleGuard.SystemAdmin>
        <SharedFormTextInput
          isRequired={false}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </SharedRoleGuard.SystemAdmin>
      <SharedTextEditor
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        label={t('common.fields.common.description')}
      />
      <div className='rubrics-form__buttons'>
        <SharedModal.Button isLoading={isSubmitting} variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button isLoading={isSubmitting} type='submit' value='Save' variant='primary'>
          {t('common.actions.save')}
        </SharedModal.Button>
      </div>
    </Form>
  );
}

export default AdminRubricsCreateModalForm;
