import { FC, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { cx } from '@shared/utils/cx';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';

type Props = {
  additionalItems?: {
    label: string;
    variant: 'neutral' | 'secondary' | 'success' | 'danger';
    Icon: FC<SVGProps<SVGSVGElement>>;
  }[];
  className?: string;
};

export const PlanStatusLegend = ({ additionalItems = [], className }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { options: defaultLegendItems } = usePlanStatusOptions();

  const legendItems = [...defaultLegendItems, ...additionalItems];

  return (
    <div className={cx('flex gap-base', className)}>
      {legendItems.map((item, index) => (
        <div key={index} className='flex items-center gap-xs'>
          <IconContainer
            Icon={item.Icon}
            className={cx('bg-white border border-neutral-300 rounded-xs', {
              'text-neutral-700': item.variant === 'neutral',
              'text-secondary-500': item.variant === 'secondary',
              'text-success-500': item.variant === 'success',
              'text-danger-500': item.variant === 'danger',
            })}
            paddingSize='xxs'
            size={isFullHD ? 'base' : 'sm'}
          />
          <span className='text-xs xxxl:text-sm font-medium leading-sm'>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
