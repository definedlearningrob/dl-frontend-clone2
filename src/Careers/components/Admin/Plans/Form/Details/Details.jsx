import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminPlanFormDetails.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  touched: PropTypes.shape({
    description: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminPlanFormDetails({ errors, touched }) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const { t } = useTranslation();

  return (
    <div className='flex flex-col gap-sm'>
      <SharedFormTextInput
        data-testid='plan-group-name-input'
        isRequired={true}
        label={t('common.fields.common.name')}
        name='name'
      />
      <SharedTextEditor
        data-testid='plan-group-decription-input'
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        label={t('common.fields.common.description')}
      />
    </div>
  );
}

export default AdminPlanFormDetails;
