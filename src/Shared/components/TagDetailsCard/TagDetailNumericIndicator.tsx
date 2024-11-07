import cx from 'classnames';
import { ReactNode } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as ChartIcon } from '@shared/assets/icons/chart_bar_2.svg';

type Props = {
  title: ReactNode;
  score?: number | null;
  variant: 'primary' | 'secondary';
};

export const TagDetailNumericIndicator = ({ title, score, variant }: Props) => {
  const iconColorClass = cx(
    {
      'text-chartPrimary-600': variant === 'primary',
      'text-chartSecondary-600': variant === 'secondary',
    },
    'border border-neutral-300 rounded-xs'
  );
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const iconSize = isFullHD ? 'base' : 'sm';
  const scoreValue = score ? score.toFixed(2) : '-.--';

  return (
    <div className='w-full'>
      <div className='text-xxs xxxl:text-xs mb-xxs xxxl:mb-x font-medium w-fit'>{title}</div>
      <div className='flex gap-xs items-center'>
        <IconContainer
          Icon={ChartIcon}
          className={iconColorClass}
          paddingSize='xxs'
          size={iconSize}
        />
        <h2 className='text-2lg xxxl:text-2xl mb-0 leading-lg font-bold'>{scoreValue}</h2>
      </div>
    </div>
  );
};
