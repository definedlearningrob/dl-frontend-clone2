import { FC, SVGProps } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as ChevronRight } from '@shared/svg/chevron_right.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  primaryAction: {
    title: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    path: string;
    text: string;
  };
  secondaryAction?: {
    title: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    path: string;
    text?: string;
  };
  className?: string;
};

export const ModuleCard = ({ primaryAction, secondaryAction, className }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const hasSecondaryAction = !!secondaryAction?.Icon;
  const cardClassnames = cx('flex flex-col relative', className, {
    'pb-md xxxl:pb-lg': hasSecondaryAction,
  });

  const primaryActionClassNames = cx(
    'text-font-primary bg-white border border-neutral-300 rounded-sm p-sm xxxl:p-base shadow-200 grow relative transition-[all] duration-300',
    'hover:text-font-primary hover:border-primary-500 hover:bg-primary-200 peer-hover:mx-xxs xxxl:peer-hover:mx-x peer-hover:px-x xxxl:peer-hover:px-sm',
    'group/primary-card'
  );

  const secondaryActionClassNames = cx(
    'text-font-primary pt-xxs pb-xs xxxl:pt-x xxxl:pb-[10px] px-x bg-white border border-neutral-300 rounded-b-sm shadow-300 transition-[all] max-h-[34px] xxxl:max-h-[48px] duration-300',
    'hover:px-sm xxxl:hover:px-base hover:max-h-[300px] hover:text-font-primary hover:z-highest hover:left-0 hover:right-0 hover:border-secondary-500 hover:bg-secondary-200 hover:rounded-t-sm',
    'absolute -translate-y-[1px] bottom-0 left-xxs xxxl:left-x right-xxs xxxl:right-x overflow-hidden',
    'peer group/secondary-card'
  );

  const iconSize = isFullHD ? 'md' : 'base';
  const iconPaddingSize = isFullHD ? 'xs' : 'xxs';

  return (
    <div className={cardClassnames}>
      {hasSecondaryAction && (
        <Link className={secondaryActionClassNames} to={secondaryAction?.path}>
          <div className='absolute w-0 h-0 border-l-transparent border-x-[24px] border-b-[16px] border-b-neutral-300 bottom-[-8px] left-1/2 -translate-x-1/2 border-r-transparent z-highest peer group-hover/secondary-card:top-[-8px] group-hover/secondary-card:rotate-180 group-hover/secondary-card:border-y-secondary-500' />

          <div className='flex gap-xs items-center text-xxxs lg:text-xxs xxxl:text-sm relative group-hover/secondary-card:hidden leading-lg'>
            <IconContainer
              Icon={secondaryAction.Icon}
              className='text-secondary-500'
              paddingSize='none'
              size={isFullHD ? 'base' : 'sm'}
            />
            <span className='truncate'>{secondaryAction?.title}</span>
          </div>

          <div className='grow relative z-high transition-[all] hidden group-hover/secondary-card:block pt-x mb-xs'>
            <div className='flex items-center justify-between mb-x xxxl:mb-base'>
              <IconContainer
                Icon={secondaryAction.Icon}
                className='bg-secondary-200 text-secondary-500 rounded-sm group-hover/secondary-card:bg-[#fff] group-hover/secondary-card:text-secondary-500'
                paddingSize={iconPaddingSize}
                size={iconSize}
              />
              <IconContainer
                Icon={ChevronRight}
                className='text-secondary-500 group-hover/secondary-card:bg-[#fff] group-hover/secondary-card:text-secondary-500 rounded-sm'
                paddingSize={iconPaddingSize}
                size={iconSize}
              />
            </div>
            <h6 className='mb-xs xxxl:mb-xs text-xs xxxl:text-sm'>{secondaryAction?.title}</h6>
            <p className='text-font-secondary text-xxs xxxl:text-xs mb-0'>
              {secondaryAction?.text}
            </p>
          </div>
        </Link>
      )}
      <Link className={primaryActionClassNames} to={primaryAction.path}>
        <div className='flex items-center justify-between mb-x xxxl:mb-base'>
          <IconContainer
            Icon={primaryAction.Icon}
            className='bg-primary-200 text-primary-500 rounded-sm group-hover/primary-card:bg-[#fff]'
            paddingSize={iconPaddingSize}
            size={iconSize}
          />
          <IconContainer
            Icon={ChevronRight}
            className='text-primary-500 group-hover/primary-card:bg-[#fff] rounded-sm'
            paddingSize={iconPaddingSize}
            size={iconSize}
          />
        </div>
        <h6 className='mb-xs xxxl:mb-xs text-xs xxxl:text-sm'>{primaryAction.title}</h6>
        <p className='text-font-secondary text-xxs xxxl:text-xs mb-0'>{primaryAction.text}</p>
      </Link>
    </div>
  );
};
