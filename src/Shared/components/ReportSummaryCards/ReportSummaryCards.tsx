import { AnimatePresence, motion } from 'framer-motion';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { StatusCard, StatusCardProps } from '@shared/components/ReportSummaryCards/StatusCard';
import { cx } from '@shared/utils/cx';

type Props<T> = {
  cards: T;
  total: number;
  isLoading: boolean;
  className?: string;
  skeletonClassName?: string;
};

const FIRST_ANIMATION_DURATION = 0.18;
const FIRST_ANIMATION_DELAY = 0.15;

export const ReportSummaryCards = <
  T extends Array<Omit<StatusCardProps, 'totalCount' | 'animationDelay'>>
>({
  isLoading,
  cards,
  total,
  className,
  skeletonClassName,
}: Props<T>) => (
  <AnimatePresence>
    <div className='bg-neutral-200 p-sm xxxl:p-base rounded-sm'>
      <div className={cx('grid grid-cols-3 gap-sm xxxl:gap-base', className)}>
        {isLoading &&
          cards.map((_, index) => (
            <div
              key={index}
              className={cx(
                'h-[225px] xxxl:h-[270px] w-full flex justify-center items-center',
                skeletonClassName
              )}>
              <SharedLoadingSpinner size='small' />
            </div>
          ))}
        {!isLoading &&
          cards.map((status, index) => {
            const duration = FIRST_ANIMATION_DURATION + index * 0.02;

            const delay = index * duration + FIRST_ANIMATION_DELAY;

            const barAnimationBegin = (delay + duration) * 1000;

            return (
              <motion.div
                key={status.title}
                animate='visible'
                className='bg-white p-sm xxxl:p-base rounded-sm'
                initial='hidden'
                transition={{
                  duration,
                  delay,
                  ease: 'easeInOut',
                }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 8 },
                }}>
                <StatusCard {...status} animationDelay={barAnimationBegin} totalCount={total} />
              </motion.div>
            );
          })}
      </div>
    </div>
  </AnimatePresence>
);
