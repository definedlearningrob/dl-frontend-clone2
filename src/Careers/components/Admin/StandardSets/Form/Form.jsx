import PropTypes from 'prop-types';
import { Form, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import { shapeStandardSetForm } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminStandardSetsForm.propTypes = {
  ...shapeStandardSetForm,
  title: PropTypes.string,
};

function AdminStandardSetsForm({ title }) {
  const { isSubmitting } = useFormikContext();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Form className='admin-form' data-testid='standard-set-form'>
      <h3 className='admin-form__heading'>{title}</h3>
      <SharedFormTextInput
        data-testid='standard-set-form-displayname-input'
        label={t('common.fields.common.displayName')}
        name='displayName'
      />
      <SharedFormDivider />
      <div className='admin-form__buttons'>
        <SharedButton
          data-testid='standard-set-form-save-button'
          isLoading={isSubmitting}
          type='submit'
          value='Save'
          variant='primary'>
          {t('common.actions.save')}
        </SharedButton>
        <SharedButton isLoading={isSubmitting} onClick={history.goBack}>
          {t('common.actions.cancel')}
        </SharedButton>
      </div>
    </Form>
  );
}

export default AdminStandardSetsForm;
