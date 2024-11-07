import cx from 'classnames';
import { FieldInputProps } from 'formik';
import { FC, HTMLProps, RefObject, SVGProps, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

export interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  'data-testid'?: string;
  errorMessage?: string;
  field?: FieldInputProps<any>;
  forwardRef?: RefObject<HTMLInputElement>;
  label?: string;
  type?: 'text' | 'url' | 'password' | 'number';
  size?: 'sm' | 'md' | 'lg';
  Icon?: FC<SVGProps<SVGSVGElement>>;
  iconPlacement?: 'start' | 'end';
  isRequired?: boolean;
  inputWrapperClassnames?: string;
}

export const TextInput = ({
  className,
  'data-testid': dataTestId,
  errorMessage,
  field,
  label,
  placeholder,
  forwardRef,
  Icon,
  iconPlacement = 'end',
  size = 'md',
  type = 'text',
  isRequired,
  disabled,
  inputWrapperClassnames,
  ...rest
}: TextInputProps) => {
  const { t } = useTranslation();
  const defaultPlaceholder = t('common.fields.common.placeholder');

  const innerRef = useRef<HTMLInputElement>(null);
  const computedRef = forwardRef || innerRef;

  const isSmall = size === 'sm';
  const isMedium = size === 'md';
  const isLarge = size === 'lg';

  const hasValue = !isEmpty(computedRef.current?.value);

  const classes = cx('flex flex-col items-start text-font-primary w-full', className, {
    'gap-xxxs': isSmall,
    'gap-xs': isMedium || isLarge,
  });

  const inputWrapperClasses = cx(
    'w-full flex gap-xs items-center justify-between bg-white rounded-sm border border-neutral-300 hover:border-neutral-400',
    'group focus-within:!border-primary-500',
    inputWrapperClassnames,
    {
      'p-xs': isSmall || isMedium,
      'p-sm': isLarge,
      'flex-row-reverse': Icon && iconPlacement === 'end',
      '!bg-neutral-200 !border-neutral-400': disabled,
      '!border-danger-600': errorMessage,
    }
  );

  const inputClasses = cx(
    'bg-transparent text-font-primary min-w-0 w-full grow',
    'w-full outline-none transition-colors autofill:shadow-[inset_0_0_0px_1000px_rgb(252,252,252)] placeholder:text-font-secondary',
    {
      'leading-[14px] text-xxs': isSmall,
      'leading-[22px] text-xs': isMedium,
      'leading-[22px] text-sm': isLarge,
      '!text-font-secondary autofill:shadow-[inset_0_0_0px_1000px_theme(colors.neutral.200)]':
        disabled,
    }
  );

  const iconClassNames = cx('text-neutral-400', {
    'h-[14px]': isSmall,
    'h-[22px]': isMedium || isLarge,
    'group-focus-within:!text-font-secondary !text-font-primary': hasValue,
  });

  const asteriskClasses = cx('text-danger-600', {
    'leading-[14px] text-xxs': isSmall,
    'leading-[22px] text-xs': isMedium,
    'leading-[22px] text-sm': isLarge,
  });

  const computedPlaceholder = placeholder || defaultPlaceholder;

  return (
    <label className={classes} data-error={errorMessage}>
      {label && (
        <InputLabel isDisabled={disabled} isRequired={isRequired} isSmall={isSmall}>
          <InjectedContent content={label} />
        </InputLabel>
      )}
      <div className={inputWrapperClasses}>
        {Icon && (
          <IconContainer
            Icon={Icon}
            className={iconClassNames}
            paddingSize='none'
            size={isSmall ? 'sm' : 'base'}
          />
        )}
        <span className='flex gap-xxs grow'>
          {!label && isRequired && <span className={asteriskClasses}>*</span>}
          <input
            ref={computedRef}
            aria-label={label}
            aria-required={isRequired}
            className={inputClasses}
            data-testid={dataTestId}
            disabled={disabled}
            id={label}
            placeholder={computedPlaceholder}
            type={type}
            {...field}
            {...rest}
          />
        </span>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </label>
  );
};
