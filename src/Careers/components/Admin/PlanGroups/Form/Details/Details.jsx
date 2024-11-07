import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminPlanGroupsFormDetails.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  touched: PropTypes.shape({
    description: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

function AdminPlanGroupsFormDetails({ errors, touched }) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const { t } = useTranslation();

  return (
    <>
      <div className='admin-form__inputs-row'>
        <SharedFormTextInput
          data-testid='plan-group-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
        <SharedFormTextInput
          data-testid='plan-group-name-input'
          isRequired={false}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedTextEditor
        data-testid='plan-group-decription-input'
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        label={t('common.fields.common.description')}
      />
    </>
  );
}

export default AdminPlanGroupsFormDetails;
