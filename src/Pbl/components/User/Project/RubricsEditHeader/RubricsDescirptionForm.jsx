import PropTypes from 'prop-types';
import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Cancel } from '@shared/svg/clear.svg';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';

RubricsDescriptionForm.propTypes = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  onClose: PropTypes.func,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    name: PropTypes.bool,
  }),
};

export function RubricsDescriptionForm({ onClose }) {
  const { isSubmitting, resetForm } = useFormikContext();
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Form>
      <div className='rubrics-builder__description-form'>
        <SharedFormTextEditor
          data-testid='rubric-description-input'
          label={t('common.fields.common.description')}
          name='description'
        />
        <div className='rubrics-builder__form-buttons'>
          <DeprecatedIconButton
            className='rubrics-builder__submit'
            data-testid='rubric-description-submit'
            disabled={isSubmitting}
            icon={<DoneIcon className='rubrics-builder__form-icon' />}
            size='sm'
            square={true}
            type='submit'
          />
          <DeprecatedIconButton
            className='rubrics-builder__cancel'
            data-testid='rubric-description-cancel'
            icon={<Cancel className='rubrics-builder__form-icon' />}
            size='sm'
            square={true}
            onClick={handleClose}
          />
        </div>
      </div>
    </Form>
  );
}
