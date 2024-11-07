import cx from 'classnames';
import { Form, useField, useFormikContext } from 'formik';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Cancel } from '@shared/svg/clear.svg';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

import { RubricsDropdown } from '../RubricsDropdown';

type Props = {
  onClose: () => void;
};

export const RubricsHeadingForm = ({ onClose }: Props) => {
  const [nameInput, nameMeta] = useField('name');
  const [multiplierInput, _, helpers] = useField('multiplier');
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  const nameClasses = cx('rubrics-builder__input', {
    '-error': nameMeta.touched && nameMeta.error,
  });

  const labelClasses = cx({
    'rubrics-builder__errors': nameMeta.touched && nameMeta.error,
  });

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Form>
      <div className='rubrics-builder__form'>
        <div>
          <div className={labelClasses}>Heading</div>
          <input
            className={nameClasses}
            data-testid='rubric-heading-input'
            placeholder={t('components.rubric.namePlaceholder')}
            {...nameInput}
          />
        </div>
        <div>
          <div>Multiplier</div>
          <RubricsDropdown value={multiplierInput.value} onChange={helpers.setValue} />
        </div>
      </div>
      <div className='rubrics-builder__form-buttons'>
        <DeprecatedIconButton
          className='rubrics-builder__submit'
          data-testid='rubric-heading-submit'
          disabled={isSubmitting}
          icon={<DoneIcon className='rubrics-builder__form-icon' />}
          size='sm'
          square={true}
          type='submit'
        />
        <DeprecatedIconButton
          className='rubrics-builder__cancel'
          data-testid='rubric-heading-cancel'
          icon={<Cancel className='rubrics-builder__form-icon' />}
          size='sm'
          square={true}
          onClick={handleClose}
        />
      </div>
    </Form>
  );
};
