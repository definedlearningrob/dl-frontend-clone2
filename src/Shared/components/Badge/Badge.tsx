import cx from 'classnames';
import { FC, ReactNode, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export type BadgeType = 'neutral' | 'primary' | 'secondary' | 'info' | 'danger' | 'success';
export type BadgeSize = 'base' | 'small' | 'big';

type Props = {
  children: ReactNode;
  type?: BadgeType;
  className?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  size?: BadgeSize;
  rounded?: 'sm' | 'full';
};

export const Badge = ({
  type = 'info',
  className,
  children,
  size = 'base',
  Icon,
  rounded = 'sm',
}: Props) => {
  const isRoundedFull = rounded === 'full';
  const isSizeSmall = size === 'small';
  const isSizeBase = size === 'base';
  const isSizeBig = size === 'big';

  const badgeClassName = cx('font-medium leading-lg flex items-center', className, {
    'bg-neutral-200 text-font-secondary': type === 'neutral',
    'bg-primary-200 text-primary-500': type === 'primary',
    'bg-secondary-200 text-secondary-500': type === 'secondary',
    'bg-info-100 text-info-500': type === 'info',
    'bg-danger-100 text-danger-500': type === 'danger',
    'bg-success-100 text-success-500': type === 'success',
    'rounded-sm': !isRoundedFull && !isSizeSmall,
    'rounded-full': isRoundedFull,
    'p-xxxs text-xxs rounded-xs': isSizeSmall && !isRoundedFull,
    'p-xxs text-xs': isSizeBase && !isRoundedFull,
    'p-xs text-xs': isSizeBig && !isRoundedFull,
    'px-xxs py-xxxs text-xxs': isSizeSmall && isRoundedFull,
    'px-xs py-xxs text-xs': isSizeBase && isRoundedFull,
    'px-x py-xs text-xs': isSizeBig && isRoundedFull,
    'gap-xxxs': isSizeSmall,
    'gap-xxs': !isSizeSmall,
  });

  return (
    <div className={badgeClassName}>
      {Icon && <IconContainer Icon={Icon} paddingSize='none' size='sm' />}
      {children}
    </div>
  );
};
