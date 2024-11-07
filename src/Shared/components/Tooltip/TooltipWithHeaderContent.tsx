import { FC, ReactNode, SVGProps } from 'react';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Kicker } from '@shared/components/Kicker';

type Props = {
  iconClassName?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  Icon?: FC<SVGProps<SVGSVGElement>>;
  header: ReactNode;
  content: ReactNode;
  className?: string;
};

export const TooltipWithHeaderContent = ({
  header,
  content,
  iconClassName,
  Icon,
  side = 'top',
  className,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const animationClass = {
    top: 'animate-slideDownAndFade',
    bottom: 'animate-slideUpAndFade',
    left: 'animate-slideRightAndFade',
    right: 'animate-slideLeftAndFade',
  }[side];

  const iconClass = cx('border border-neutral-300 bg-white rounded-xs', iconClassName);

  const containerClassName = cx(
    '!bg-white !text-neutral-800 rounded-sm shadow-200',
    'tracking-normal max-w-[250px] border border-neutral-300 break-words',
    animationClass,
    className
  );

  return (
    <div className={containerClassName}>
      <div className='flex justify-start items-center gap-xxs xxxl:gap-xs border-b border-b-neutral-300 bg-neutral-200 px-x py-xxs rounded-t-sm'>
        {Icon && <IconContainer Icon={Icon} className={iconClass} paddingSize='xxs' size='sm' />}
        <Kicker className='!mb-0' size={isFullHD ? 'md' : 'sm'} variant='dark'>
          {header}
        </Kicker>
      </div>
      <div className='px-x py-xs xxxl:px-sm xxxl:py-x flex flex-col items-start self-stretch text-xxs xxxl:text-xs leading-lg'>
        {content}
      </div>
    </div>
  );
};
