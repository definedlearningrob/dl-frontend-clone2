import cx from 'classnames';
import { HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldInputProps } from 'formik';

import './Textarea.sass';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';

export interface Props extends HTMLProps<HTMLTextAreaElement> {
  errorMessage?: string;
  field?: FieldInputProps<any>;
  label?: string;
  textareaClassName?: string;
  isRequired?: boolean;
}

function SharedTextarea({
  className,
  disabled,
  errorMessage,
  field,
  label,
  placeholder,
  textareaClassName,
  isRequired,
  ...rest
}: Props) {
  const { t } = useTranslation();
  const defaultPlaceholder = t('common.fields.common.placeholder');

  const textareaWrapperClassname = cx('flex flex-col gap-xs', className);

  return (
    <div className={textareaWrapperClassname} data-error={errorMessage}>
      <label className='flex flex-col gap-xs'>
        {label && (
          <InputLabel isRequired={isRequired} isSmall={false}>
            {label}
          </InputLabel>
        )}
        <textarea
          className={cx('textarea__input !mb-0', textareaClassName)}
          data-error={errorMessage}
          disabled={disabled}
          id={label}
          placeholder={placeholder || defaultPlaceholder}
          {...field}
          {...rest}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </label>
    </div>
  );
}

export default SharedTextarea;
