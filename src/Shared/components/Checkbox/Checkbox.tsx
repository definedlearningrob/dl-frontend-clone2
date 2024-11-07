import cx from 'classnames';
import PropTypes from 'prop-types';
import { DOMAttributes, useEffect, useRef, InputHTMLAttributes } from 'react';

import './Checkbox.sass';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';

SharedCheckbox.defaultProps = {
  'data-testid': 'checkbox',
};

SharedCheckbox.propTypes = {
  'data-testid': PropTypes.string,
  errorMessage: PropTypes.string,
};

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  'data-testid'?: string;
  errorMessage?: string;
  labelClassName?: string;
  indeterminate?: boolean;
  labelOnClick?: DOMAttributes<HTMLLabelElement>['onClick'];
};

function SharedCheckbox({
  checked,
  className,
  labelClassName,
  'data-testid': dataTestId,
  disabled,
  errorMessage,
  id,
  indeterminate,
  label,
  labelOnClick,
  name,
  onChange,
  ...rest
}: Props) {
  const classes = cx('checkbox', className);
  const labelClasses = cx('checkbox__label', { '-checked': checked }, labelClassName);

  const labelProps = labelOnClick ? { onClick: labelOnClick } : {};

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (indeterminate !== undefined && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={classes} data-error={errorMessage}>
      <input
        ref={inputRef}
        checked={checked}
        className='checkbox__input'
        data-testid={dataTestId}
        disabled={disabled}
        id={id || label}
        name={name}
        tabIndex={rest.readOnly ? -1 : 0}
        type='checkbox'
        onChange={onChange}
        {...rest}
      />
      <label className={labelClasses} htmlFor={id || label} {...labelProps}>
        {label}
      </label>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

export default SharedCheckbox;
