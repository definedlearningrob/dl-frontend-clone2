import { FC, ReactNode, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { HorizontalBarChart } from '@shared/components/HorizontalBarChart/HorizontalBarChart';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export type StatusCardProps = {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  renderTitleInfoPopover?: () => ReactNode;
  renderTextValue: (value: number) => ReactNode;
  iconClassname: string;
  description: string;
  barColorClassname: string;
  count: number;
  totalCount: number;
  animationDelay?: number;
};

const ANIMATION_DURATION = 1800;

export const StatusCard = ({
  title,
  Icon,
  renderTitleInfoPopover,
  iconClassname,
  renderTextValue,
  description,
  barColorClassname,
  count,
  totalCount,
  animationDelay = 0,
}: StatusCardProps) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const percentValue = Math.round((count / totalCount) * 100) || 0;

  const percentLabel = totalCount === 0 ? '--' : `${percentValue}%`;

  return (
    <div className='flex flex-col h-full'>
      <div className='flex gap-xxs'>
        <h6 className='mb-xs xxxl:mb-x text-xs xxxl:text-sm'>{title}</h6>
        {renderTitleInfoPopover && renderTitleInfoPopover()}
      </div>
      <div className='flex gap-xs mb-xs'>
        <div className='flex items-center'>
          <IconContainer
            Icon={Icon}
            className={cx('border border-neutral-300 rounded-xs', iconClassname)}
            paddingSize='xxs'
            size={isFullHD ? 'base' : 'sm'}
          />
        </div>
        <div className='text-2lg xxxl:text-2xl font-bold text-neutral-800'>{percentLabel}</div>
      </div>
      <div className='font-medium text-xxs xxxl:text-xs mb-xs xxxl:mb-x'>
        {renderTextValue(count)}
      </div>
      <div className='text-neutral-700 text-xxs italic xxxl:text-xs leading-lg mb-sm xxxl:mb-base'>
        {description}
      </div>
      <div className='mt-auto'>
        <HorizontalBarChart
          animationBegin={animationDelay}
          animationDuration={ANIMATION_DURATION}
          barColorClassname={barColorClassname}
          unit='%'
          value={percentValue}
        />
      </div>
    </div>
  );
};
