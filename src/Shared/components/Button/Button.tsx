import cx from 'classnames';
import { useMemo, ReactNode, ButtonHTMLAttributes, forwardRef, Ref, FC, SVGProps } from 'react';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import './Button.sass';

export type ButtonVariant =
  | 'danger'
  | 'default'
  | 'primary'
  | 'primary-outlined'
  | 'secondary'
  | 'success'
  | 'link';

type TSize = 'sm' | 'md' | 'lg';

export interface TSharedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  'data-testid'?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  iconPlacement?: 'start' | 'end';
  minWidth?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  size?: TSize;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  ref?: Ref<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, TSharedButtonProps>(
  (
    {
      children,
      className,
      iconClassName,
      'data-testid': dataTestId = 'button',
      disabled,
      Icon,
      id,
      isLoading,
      minWidth,
      onClick,
      size = 'md',
      type = 'button',
      variant = 'default',
      iconPlacement = 'start',
      contentClassName,
      ...rest
    }: TSharedButtonProps,
    ref
  ) => {
    const isDefaultVariant = variant === 'default';
    const isPrimaryOutlinedVariant = variant === 'primary-outlined';
    const isSm = size === 'sm';

    const shouldHaveBorder = !['link', 'text-link'].includes(variant);
    const shouldHaveLightText = !['primary-outlined', 'default'].includes(variant);

    const classes = cx(
      'button',
      'flex items-center justify-center gap-xs',
      'rounded-sm cursor-pointer text-sm font-medium no-underline',
      'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px]',
      className,
      {
        [`-${variant}`]: variant,
        'text-primary-500 hover:bg-primary-200': isPrimaryOutlinedVariant,
        'bg-white text-font-primary hover:bg-primary-200 outline-primary-500 border-white hover:border-primary-200':
          isDefaultVariant,
        'bg-primary-500 hover:bg-primary-600 outline-primary-500 border-primary-500':
          variant === 'primary',
        'bg-secondary-500 hover:bg-secondary-600 outline-secondary-500 border-secondary-500':
          variant === 'secondary',
        'bg-danger-500 hover:bg-danger-600 outline-danger-500 border-danger-500':
          variant === 'danger',
        'bg-success-500 hover:bg-success-600 outline-success-500 border-success-500':
          variant === 'success',
        'py-xs px-sm !text-xs leading-[14px] !gap-xxs': isSm,
        'py-xs px-base leading-[22px]': size === 'md',
        'py-sm px-md leading-[22px]': size === 'lg',
        'flex-row-reverse': iconPlacement === 'end',
        [`-min-width-${minWidth}`]: minWidth,
        border: shouldHaveBorder,
        'text-white': shouldHaveLightText,
      }
    );

    const iconClassnames = cx(iconClassName, {
      'h-[14px] mt-[-1px]': isSm,
    });

    const spinnerColor = useMemo(() => {
      if (isPrimaryOutlinedVariant) {
        return variant;
      } else if (isDefaultVariant) {
        return 'disabled';
      }

      return 'white';
    }, [variant]);

    return (
      <button
        {...rest}
        ref={ref}
        className={classes}
        data-testid={dataTestId}
        disabled={disabled || isLoading}
        id={id}
        type={type}
        onClick={onClick}>
        {!!Icon && !isLoading && (
          <IconContainer Icon={Icon} className={iconClassnames} paddingSize='none' size='sm' />
        )}
        <span className={cx('items-center flex justify-center gap-xs', contentClassName)}>
          {isLoading && <SharedLoadingSpinner color={spinnerColor} size='xs' />}
          {children}
        </span>
      </button>
    );
  }
);

export default Button;
