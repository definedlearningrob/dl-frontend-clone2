import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { ReactComponent as InProgressIcon } from '@shared/svg/submitted_icon.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

const FIRST_ANIMATION_DURATION = 0.18;
const FIRST_ANIMATION_DELAY = 0.15;

const summaryItemConfig = {
  started: {
    titleKey: 'assessmentReport.takenAssessments',
    descriptionKey: 'assessmentReport.takenAssessmentsDescription',
    Icon: InProgressIcon,
    iconClassName: 'text-secondary-500',
    animationDuration: FIRST_ANIMATION_DURATION,
    animationDelay: FIRST_ANIMATION_DELAY,
  },
  completed: {
    titleKey: 'assessmentReport.completedAssessments',
    descriptionKey: 'assessmentReport.completedAssessmentsDescription',
    Icon: CompletedIcon,
    iconClassName: 'text-success-500',
    animationDuration: FIRST_ANIMATION_DURATION + 0.02,
    animationDelay: FIRST_ANIMATION_DELAY + FIRST_ANIMATION_DURATION + 0.02,
  },
};

type Props = {
  status: 'started' | 'completed';
  value: number;
};

export const AssessmentSummaryItem = ({ status, value }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { titleKey, descriptionKey, Icon, iconClassName, animationDelay, animationDuration } =
    summaryItemConfig[status];

  return (
    <motion.div
      animate='visible'
      className='flex-1 flex flex-col gap-xs xxxl:gap-x p-sm xxxl:p-base bg-white rounded-sm'
      data-testid='assessment-summary-item'
      initial='hidden'
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: 'easeInOut',
      }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 8 },
      }}>
      <h6 className='text-xs xxxl:text-sm mb-0'>{t(titleKey)}</h6>
      <div className='flex items-center gap-xs'>
        <IconContainer
          Icon={Icon}
          className={cx('rounded-xs border border-neutral-300', iconClassName)}
          paddingSize='xxs'
          size={isFullHD ? 'base' : 'sm'}
        />
        <span className='text-2lg xxxl:text-2xl font-bold'>{value}</span>
      </div>
      <span className='text-xxs xxxl:text-xs text-font-secondary leading-lg italic'>
        {t(descriptionKey)}
      </span>
    </motion.div>
  );
};
