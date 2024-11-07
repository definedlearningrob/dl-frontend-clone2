import { AnimatePresence, motion } from 'framer-motion';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';

import { PlanStatement } from './PlanStatement/PlanStatement';
import { ExpandCardButton } from './ExpandCardButton';

import type { StudentInfo, TPlanGroup, UserInfo } from './types';

const statusIconMap = {
  [EVALUATION_RESULTS_VALUES.NOT_STARTED]: NotStartedIcon,
  [EVALUATION_RESULTS_VALUES.IN_PROGRESS]: InProgressIcon,
  [EVALUATION_RESULTS_VALUES.COMPLETED]: CompletedIcon,
  [EVALUATION_RESULTS_VALUES.NOT_MET]: NotMetIcon,
};

type Props = {
  userInfo: UserInfo | StudentInfo;
  planGroup: TPlanGroup;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
};

export const PlanGroup = ({ userInfo, planGroup, isExpanded, toggleIsExpanded }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { status } = planGroup;

  const cardClasses = cx(
    'overflow-hidden group p-base xxxl:p-md rounded-sm bg-white xxxl:max-w-[1200px] transition-all',
    'border border-neutral-300 focus-within:border-primary-500 plan-group',
    {
      'border-primary-500 pb-base xxxl:pb-md': isExpanded,
      'hover:bg-neutral-200 hover:border-neutral-400': !isExpanded,
    }
  );
  const statusIconClasses = cx('outline outline-1 outline-neutral-300 bg-white rounded-xs !h-fit', {
    'text-success-500': status === EVALUATION_RESULTS_VALUES.COMPLETED,
    'text-secondary-500': status === EVALUATION_RESULTS_VALUES.IN_PROGRESS,
    'text-font-secondary': status === EVALUATION_RESULTS_VALUES.NOT_STARTED,
    'text-danger-500': status === EVALUATION_RESULTS_VALUES.NOT_MET,
  });

  return (
    <li aria-label={planGroup.displayName} className={cardClasses} data-id={planGroup.id}>
      <div className='relative' role='button' onClick={toggleIsExpanded}>
        <div className='flex gap-xs xxxl:gap-sm mb-xs xxxl:mb-sm mr-lg'>
          <IconContainer
            Icon={statusIconMap[status]}
            className={statusIconClasses}
            paddingSize='xxs'
            size={isFullHD ? 'base' : 'sm'}
          />
          <h5
            className={cx(
              'mb-0 text-sm xxxl:text-base leading-lg max-w-[680px] xxxl:max-w-[840px]',
              {
                'text-primary-500': isExpanded,
              }
            )}>
            {planGroup.displayName || planGroup.name}
          </h5>
        </div>
        <ExpandCardButton
          className='absolute right-0 top-0 group-hover:text-primary-500'
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
        />
        <div
          className='text-neutral-700 ml-md xxxl:ml-lg max-w-[680px] xxxl:max-w-[840px] text-xs xxxl:text-sm [&_p:last-child]:mb-0'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={cleanInjection(planGroup.description)}
        />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            key='content'
            animate='open'
            className='flex flex-col gap-sm xxxl:gap-base mt-base xxxl:mt-md'
            exit='collapsed'
            initial='collapsed'
            transition={{
              duration: 0.3,
              opacity: { duration: 0.1, delay: 0.1 },
            }}
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
              },
              collapsed: { height: 0, opacity: 0 },
            }}>
            {planGroup.statements.map((statement) => (
              <PlanStatement key={statement.id} statement={statement} userInfo={userInfo} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
