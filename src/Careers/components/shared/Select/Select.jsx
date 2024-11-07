import PropTypes from 'prop-types';
import cx from 'classnames';

import { Select } from '@shared/components/Select';

import styles from './Select.module.sass';

SharedSelect.propTypes = {
  className: PropTypes.string,
  components: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  'data-testid': PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  selectProps: PropTypes.object,
  selectStyles: PropTypes.func,
  showError: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

function SharedSelect({
  className,
  components,
  'data-testid': dataTestId,
  disabled,
  errorMessage,
  isLoading,
  isMulti = false,
  label,
  name,
  onBlur,
  isClearable = false,
  onChange,
  options,
  value,
  defaultValue,
  selectProps,
  showError = true,
  size = 'md',
  placeholder,
  menuPlacement,
  selectStyles = { menuPortal: (base) => ({ ...base, fontSize: '14px' }) },
}) {
  const selectWrapperClassName = cx(
    styles.selectContainer,
    { '!gap-xxxs': size === 'xs' },
    className
  );

  const inputId = `select-input-${name}`;

  return (
    <div className={selectWrapperClassName} data-error={errorMessage} data-testid={dataTestId}>
      {label && (
        <label
          className={cx('text-font-secondary text-xs leading-lg dc-select__label', {
            '!text-xxs': size === 'xs',
          })}
          htmlFor={inputId}>
          {label}
        </label>
      )}
      <Select
        components={components}
        data-testid={dataTestId}
        defaultValue={defaultValue}
        inputId={inputId}
        isClearable={isClearable}
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={isMulti}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        name={name}
        options={options}
        placeholder={placeholder}
        size={size}
        styles={selectStyles}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        {...selectProps}
      />
      {showError && <div className='input-error-message'>{errorMessage && errorMessage}</div>}
    </div>
  );
}

export default SharedSelect;
