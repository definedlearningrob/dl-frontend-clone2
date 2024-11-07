import { FC, ReactNode, SVGProps, useRef } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as CareerPathwayIcon } from '@dc/assets/icons/pathway.svg';

import TextHighlighter from '@shared/components/TextHighlighter/TextHighlighter';
import { cx } from '@shared/utils/cx';
import Image from '@shared/components/Image/Image';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';

import { Tooltip } from '../Tooltip';

export type GenericCardContentProps = {
  onClick?: () => void;
  title: string;
  subTitle?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  TypeIcon: FC<SVGProps<SVGSVGElement>>;
  typeIconTooltipMessage: string;
  backgroundUrl: string | null;
  pathways?: { name: string }[];
  badge?: { type: BadgeType; text: string };
  customTooltipMessage?: ReactNode;
  highlightText?: string;
  titleToHighlight?: string;
};

const TOOLTIP_DELAY_DURATION = 500;

const classNames = cx(
  'cursor-pointer rounded-sm h-full relative overflow-hidden whitespace-normal',
  'before:absolute',
  'before:!bg-generic-card-gradient before:inset-0',
  'hover:before:!bg-generic-card-gradient-hovered',
  'hover:before:bg-[#3c42583d]',
  'hover:shadow-300',
  'group/card'
);

const highlightTriangleClassName = cx(
  'before:absolute before:right-0 before:bottom-0 before:h-0 before:w-0',
  'before:border-b-[32px] before:border-l-[32px]',
  'xxxl:before:border-b-[48px] xxxl:before:border-l-[48px]',
  'before:border-b-warning-500 before:border-l-warning-500 before:border-[transparent_transparent_#EBC500_transparent]',
  'group-hover/card:before:translate-x-full before:transition-transform'
);

const iconClassNames = cx(
  'transition-colors ms-auto',
  'h-md w-md xxxl:h-lg xxxl:w-lg',
  'text-white group-hover/card:bg-white group-hover/card:text-primary-500'
);

export const GenericCardContent = ({
  onClick,
  Icon,
  title,
  subTitle,
  pathways,
  typeIconTooltipMessage,
  TypeIcon,
  backgroundUrl,
  badge,
  customTooltipMessage,
  highlightText,
  titleToHighlight,
}: GenericCardContentProps) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const pathwayNameRef = useRef<HTMLHeadingElement>(null);

  const isTitleOverflowing = useIsTruncated({ ref: titleRef });
  const isSubtitleOverflowing = useIsTruncated({ ref: subTitleRef, mode: 'single-line' });
  const isPathwayNameOverflowing = useIsTruncated({ ref: pathwayNameRef, mode: 'single-line' });

  const cardContentClassName = cx(
    'absolute inset-0 group-hover/card:pb-sm group-hover/card:xxxl:pb-base',
    'px-sm pt-sm pb-base',
    'xxxl:px-base xxxl:pt-base xxxl:pb-md',
    { [highlightTriangleClassName]: highlightText }
  );

  const iconSize = isFullHD ? 'md' : 'base';

  const pathwayNames = pathways?.map((pathway) => pathway.name).join(', ');

  return (
    <motion.div
      animate='rest'
      aria-label={title}
      className={classNames}
      initial='rest'
      role={onClick ? 'button' : 'none'}
      whileHover='hover'
      onClick={onClick}>
      <Image className='w-full h-full object-cover' src={backgroundUrl} />
      <div className={cardContentClassName}>
        <div className='relative h-full flex flex-col justify-end'>
          <div>
            <div
              className={cx('flex flex-row-reverse justify-between absolute top-0 right-0 left-0', {
                'items-start': highlightText,
                'items-center': !highlightText,
              })}>
              <div className='border border-white rounded-full overflow-hidden'>
                <IconContainer
                  Icon={Icon}
                  className={iconClassNames}
                  paddingSize={isFullHD ? 'xs' : 'xxs'}
                  size={iconSize}
                />
              </div>
              <div className={cx('flex flex-col', { 'gap-xs xxxl:gap-x': !!highlightText })}>
                <div className='w-fit'>
                  {badge && (
                    <Badge rounded='full' size={isFullHD ? 'base' : 'small'} type={badge.type}>
                      {badge.text}
                    </Badge>
                  )}
                </div>
                {highlightText && (
                  <span className='text-xxxs xxxl:text-xs font-bold text-warning-500 uppercase'>
                    {highlightText}
                  </span>
                )}
              </div>
            </div>
          </div>
          {pathwayNames && (
            <Tooltip
              delayDuration={TOOLTIP_DELAY_DURATION}
              disabled={!isPathwayNameOverflowing}
              message={pathwayNames}>
              <div className='flex text-neutral-300 items-center gap-xxs mb-xxxs'>
                <IconContainer
                  Icon={CareerPathwayIcon}
                  paddingSize='none'
                  size={isFullHD ? 'base' : 'sm'}
                />
                <div
                  ref={pathwayNameRef}
                  className='text-xxs xxxl:text-xs italic leading-lg truncate'>
                  {pathwayNames}
                </div>
              </div>
            </Tooltip>
          )}
          <Tooltip
            delayDuration={TOOLTIP_DELAY_DURATION}
            disabled={!isTitleOverflowing && !customTooltipMessage}
            message={customTooltipMessage ?? <span className='text-xs'>{title}</span>}>
            <TextHighlighter text={titleToHighlight} theme='light'>
              <h5
                ref={titleRef}
                className='text-white text-xs xxxl:text-lg leading-[1.2] line-clamp-3 mb-0 highlightible'>
                {title}
              </h5>
            </TextHighlighter>
          </Tooltip>
          <motion.div
            className='w-full overflow-hidden'
            variants={{
              rest: {
                height: 0,
                y: isFullHD ? 24 : 16,
                transition: {
                  duration: 0.15,
                  ease: 'easeOut',
                },
              },
              hover: {
                y: 0,
                height: 'min-content',
                transition: {
                  duration: 0.15,
                  ease: 'easeOut',
                },
              },
            }}>
            <div className='pt-xxs flex items-center gap-xs'>
              {subTitle && (
                <Tooltip
                  className='min-w-0'
                  delayDuration={TOOLTIP_DELAY_DURATION}
                  disabled={!isSubtitleOverflowing}
                  message={subTitle}
                  side='bottom'>
                  <h6
                    ref={subTitleRef}
                    className='mb-0 font-medium text-xs xxxl:text-base leading-lg truncate text-warning-500'>
                    {subTitle}
                  </h6>
                </Tooltip>
              )}
              <div className='ms-auto'>
                <Tooltip
                  className='min-w-0'
                  delayDuration={500}
                  message={typeIconTooltipMessage}
                  side='bottom'>
                  <IconContainer
                    Icon={TypeIcon}
                    className='text-white'
                    paddingSize='none'
                    size={iconSize}
                  />
                </Tooltip>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
