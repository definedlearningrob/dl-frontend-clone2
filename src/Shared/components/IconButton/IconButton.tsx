import cx from 'classnames';
import { FC, ForwardedRef, HTMLProps, SVGProps, forwardRef } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export interface TSharedIconButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  'aria-label'?: string;
  'data-testid'?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg';
  circle?: boolean;
  type?: 'button' | 'submit';
  buttonName?: string;
  variant?:
    | 'white'
    | 'default'
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'danger'
    | 'danger-outlined'
    | 'success';
}

export const IconButton = forwardRef(
  (props: TSharedIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      'aria-label': ariaLabel,
      'data-testid': dataTestId = 'icon-button',
      disabled,
      Icon,
      onClick,
      size = 'sm',
      circle = false,
      type = 'button',
      variant = 'white',
      className,
      ...rest
    } = props;
    const isSm = size === 'sm';
    const isMd = size === 'md';

    const classes = cx(
      'flex items-center justify-center transition-colors rounded-sm border border-transparent cursor-pointer',
      'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px]',
      {
        'text-primary-500 bg-white hover:bg-primary-200': variant === 'white',
        'text-neutral-600 hover:!bg-neutral-200 outline-neutral-400': variant === 'default',
        'bg-primary-500 text-white hover:bg-primary-600 outline-primary-500': variant === 'primary',
        'text-danger-500 hover:bg-danger-100 outline-danger-500': variant === 'danger',
        'text-white bg-success-500 hover:bg-success-600 outline-success-500': variant === 'success',
        '!border-primary-500 text-primary-500 hover:bg-primary-200 outline-primary-500 ':
          variant === 'primary-outlined',
        '!border-danger-500 text-danger-500 hover:bg-danger-100 outline-danger-500':
          variant === 'danger-outlined',
        'h-base w-base ': isSm,
        'w-md h-md': isMd,
        'w-[40px] h-[40px]': size === 'lg',
        '!rounded-full': circle,
        'opacity-50 !cursor-default hover:bg-transparent': disabled,
      },
      className
    );

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={classes}
        data-testid={dataTestId}
        disabled={disabled}
        type={type}
        onClick={onClick}
        {...rest}>
        <IconContainer Icon={Icon} paddingSize='none' size={isSm ? 'sm' : 'base'} />
      </button>
    );
  }
);
