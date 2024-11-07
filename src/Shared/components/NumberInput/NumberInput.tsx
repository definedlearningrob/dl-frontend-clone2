import React, { ChangeEvent, useState } from 'react';
import { isEmpty, isNumber } from 'lodash-es';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IncreaseIcon } from '@shared/svg/add.svg';
import { ReactComponent as DecreaseIcon } from '@shared/svg/remove.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

interface NumberInputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size'> {
  minValue?: number;
  maxValue?: number;
  onChange: (newValue: number) => void;
  labelClassName?: string;
  size?: 'sm' | 'xs' | 'md';
  wrapperClassName?: string;
}

const NUMBER_REGEX = /^-?\d+$/;

export const NumberInput = ({
  minValue,
  maxValue,
  onChange,
  value,
  name,
  label,
  labelClassName,
  size = 'sm',
  wrapperClassName,
  ...inputProps
}: NumberInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const { t } = useTranslation();

  const numberValue = Number(value);

  const handleChange = (newValue: number) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (NUMBER_REGEX.test(newValue)) {
      handleChange(Number(newValue));
    }
    if (isEmpty(newValue) || newValue === '-') {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    if (inputValue !== value) {
      setInputValue(value);
    }

    if (isNumber(maxValue) && numberValue > maxValue) {
      handleChange(maxValue);
    } else if (isNumber(minValue) && numberValue < minValue) {
      handleChange(minValue);
    }
  };

  const incrementValue = () => {
    handleChange(numberValue + 1);
  };

  const decrementValue = () => {
    handleChange(numberValue - 1);
  };

  const labelClassname = cx(
    'block text-neutral-700 !leading-lg text-xxs xxxl:text-xs mb-xxxs',
    { 'before:content-["*"] before:pe-xxs before:text-danger-600': inputProps.required },
    labelClassName
  );

  const iconSize = size === 'xs' ? { iconSize: 'xs' as const } : {};

  const mergedWrapperClassName = cx(
    'flex items-center justify-between gap-xs rounded-sm p-xxs bg-white shadow-input',
    wrapperClassName
  );

  return (
    <div>
      {label && (
        <label className={labelClassname} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={mergedWrapperClassName}>
        <DeprecatedIconButton
          aria-label={t('numberInput.decrease')}
          className='text-primary-500 hover:!bg-primary-200'
          disabled={numberValue === minValue}
          icon={<DecreaseIcon />}
          square={true}
          {...iconSize}
          size='xs'
          onClick={decrementValue}
        />
        <input
          className='bg-white outline-none min-w-0 text-center text-font-secondary leading-sm text-xs xxxl:text-sm'
          id={label}
          inputMode='numeric'
          {...inputProps}
          role='input'
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        <DeprecatedIconButton
          aria-label={t('numberInput.increase')}
          className='text-primary-500 hover:!bg-primary-200'
          disabled={numberValue === maxValue}
          {...iconSize}
          icon={<IncreaseIcon />}
          size='xs'
          square={true}
          onClick={incrementValue}
        />
      </div>
    </div>
  );
};
