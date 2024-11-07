import PropTypes from 'prop-types';
import { Form, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Cancel } from '@shared/svg/clear.svg';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { TextInput } from '@shared/components/TextInput/TextInput';

RubricsHeaderForm.propTypes = {
  onClose: PropTypes.func,
};

export function RubricsHeaderForm({ onClose }) {
  const [nameInput, nameMeta] = useField('name');
  const [displayNameInput] = useField('displayName');
  const { isSubmitting, resetForm } = useFormikContext();
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Form className='w-full pe-lg'>
      <div className='rubrics-builder__display-name-form'>
        <div className='grow'>
          <TextInput
            data-testid='rubric-header-input'
            errorMessage={(nameMeta.touched && nameMeta.error) || undefined}
            field={nameInput}
            placeholder={t('components.rubric.namePlaceholder')}
          />
          <TextInput
            data-testid='rubric-header-display-name-input'
            field={displayNameInput}
            placeholder={t('components.rubric.displayNamePlaceholder')}
          />
        </div>
        <div className='rubrics-builder__form-buttons -inline -margin-left'>
          <DeprecatedIconButton
            className='rubrics-builder__submit'
            data-testid='rubric-header-submit'
            disabled={isSubmitting}
            icon={<DoneIcon className='rubrics-builder__form-icon' />}
            size='sm'
            square={true}
            type='submit'
          />
          <DeprecatedIconButton
            className='rubrics-builder__cancel'
            data-testid='rubric-header-cancel'
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
