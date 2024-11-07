import { FC, PropsWithChildren, SVGProps } from 'react';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type TagType = 'neutral' | 'secondary' | 'primary' | 'white' | 'success';

type Props = PropsWithChildren<{
  Icon?: FC<SVGProps<SVGSVGElement>>;
  type?: TagType;
  variant?: 'filled' | 'outlined';
  iconPlacement?: 'start' | 'end';
}>;

export const NewTag = ({
  children,
  Icon,
  type = 'neutral',
  variant = 'filled',
  iconPlacement = 'start',
}: Props) => (
  <div
    className={cx(
      'flex gap-xxs px-xs py-xxs rounded-full text-xxs font-medium leading-lg transition-all',
      {
        'flex-row-reverse': iconPlacement === 'end',
        'bg-neutral-200 text-font-primary': type === 'neutral' && variant === 'filled',
        'bg-white text-font-primary outline outline-1 outline-neutral-200':
          type === 'neutral' && variant === 'outlined',
        'bg-secondary-200 text-secondary-500 hover:outline outline-1 outline-secondary-500':
          type === 'secondary' && variant === 'filled',
        'bg-white text-secondary-500 outline outline-1 outline-secondary-500 hover:bg-secondary-200':
          type === 'secondary' && variant === 'outlined',
        'bg-primary-200 text-primary-500 hover:outline outline-1 outline-primary-500':
          type === 'primary' && variant === 'filled',
        'bg-white text-primary-500 outline outline-1 outline-primary-500 hover:bg-primary-200':
          type === 'primary' && variant === 'outlined',
        'bg-white text-font-primary': type === 'white',
        'bg-success-200 text-success-500': type === 'success' && variant === 'filled',
        'bg-white text-success-500 outline outline-1 outline-success-500':
          type === 'success' && variant === 'outlined',
      }
    )}>
    {Icon && <IconContainer Icon={Icon} paddingSize='none' size='sm' />}
    <div className='truncate'>{children}</div>
  </div>
);
