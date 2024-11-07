import cx from 'classnames';
import { FC, SVGProps } from 'react';

type Props = {
  'data-testid'?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  paddingSize?: 'xxxs' | 'xxs' | 'xs' | 'x' | 'sm' | 'base' | 'md' | 'lg' | 'none';
  size?: 'xs' | 'sm' | 'x' | 'base' | 'md' | 'lg' | '2lg' | 'xl' | 'xxl';
};

export const IconContainer = ({
  className,
  Icon,
  size = 'base',
  paddingSize = 'xs',
  'data-testid': dataTestId = 'icon',
}: Props) => {
  const classes = cx('flex align-center justify-center grow-0 shrink-0', className, {
    'p-xxxs': paddingSize === 'xxxs',
    'p-xxs': paddingSize === 'xxs',
    'p-x': paddingSize === 'x',
    'p-xs': paddingSize === 'xs',
    'p-sm': paddingSize === 'sm',
    'p-base': paddingSize === 'base',
    'p-md': paddingSize === 'md',
    'p-lg': paddingSize === 'lg',
  });

  const iconClasses = cx({
    'h-xs w-xs': size === 'xs',
    'h-sm w-sm': size === 'sm',
    'h-x w-x': size === 'x',
    'h-base w-base': size === 'base',
    'h-md w-md': size === 'md',
    'h-lg w-lg': size === 'lg',
    'h-2lg w-2lg': size === '2lg',
    'h-xl w-xl': size === 'xl',
    'h-2xl w-2xl': size === 'xxl',
  });

  return (
    <div className='flex'>
      <div className={classes} data-testid={dataTestId}>
        <Icon className={iconClasses} />
      </div>
    </div>
  );
};
