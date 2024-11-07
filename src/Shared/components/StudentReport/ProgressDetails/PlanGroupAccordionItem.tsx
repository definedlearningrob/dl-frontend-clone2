import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useMemo } from 'react';
import { sortBy } from 'lodash-es';

import { PieChart } from '@shared/components/PieChart';
import { cx } from '@shared/utils/cx';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { PlanGroupProgress } from '@shared/components/StudentReport/ProgressDetails/PlanGroupProgress';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { getGroupProgress } from '@shared/components/StudentReport/ProgressDetails/helpers';
import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { TPlanGroup } from '@shared/graphql/student/query/studentReportProgressByStudent';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { Statement } from './Statement';

type Props = {
  isExpanded: boolean;
  group?: TPlanGroup;
  isLoading: boolean;
};

export const PlanGroupAccordionItem = ({ isExpanded, group, isLoading }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { displayName, name, statements, description } = group || {};

  const sortedStatements = useMemo(() => sortBy(statements, 'name'), [statements]);

  const chartWrapperClassName = cx('transition-all ease-out p-xxs shrink-0', {
    'w-[132px] h-[132px] xxxl:w-[172px] xxxl:h-[172px] rotate-[360deg] duration-[500ms]':
      isExpanded,
    'w-[56px] h-[56px] rotate-[0deg] duration-[300ms]': !isExpanded,
  });

  const planGroupClassName = cx(
    'relative rounded-sm border border-neutral-300 p-sm xxxl:p-base',
    'focus-visible:!border-secondary-500 focus-visible:border',
    {
      'group hover:bg-neutral-200': !isExpanded && !isLoading,
      'border-primary-500 mb-sm xxxl:mb-base': isExpanded,
    }
  );

  const chevronClassName = cx(
    '!bg-white transition-colors',
    '!rounded-sm !border-white focus-visible:!border-primary-500',
    {
      'rotate-180': isExpanded,
    }
  );

  const progressData = useMemo(() => getGroupProgress(statements), [statements]);

  const chartData = [
    {
      name: EVALUATION_RESULTS_VALUES.NOT_STARTED,
      value: progressData.progress.NOT_STARTED,
      colorClassName: 'fill-neutral-600',
    },
    {
      name: EVALUATION_RESULTS_VALUES.IN_PROGRESS,
      value: progressData.progress.IN_PROGRESS,
      colorClassName: 'fill-secondary-500',
    },
    {
      name: EVALUATION_RESULTS_VALUES.COMPLETED,
      value: progressData.progress.COMPLETED,
      colorClassName: 'fill-success-500',
    },
    {
      name: EVALUATION_RESULTS_VALUES.NOT_MET,
      value: progressData.progress.NOT_MET,
      colorClassName: 'fill-danger-500',
    },
  ];

  return (
    <div className={planGroupClassName}>
      <Accordion.Header asChild={true}>
        <Accordion.Trigger asChild={true}>
          <button
            className={cx(
              'text-start w-full flex gap-base xxxl:gap-md focus-visible:outline-offset-4',
              {
                'mb-base xxxl:mb-md': isExpanded,
                'cursor-pointer': !isLoading,
              }
            )}>
            <div className={chartWrapperClassName}>
              {isLoading && <SkeletonRectangle height='full-height' size='full-width' />}
              {!isLoading && <PieChart data={chartData} isResponsive={true} />}
            </div>
            <div className='w-full focus-visible:!outline-secondary-500'>
              <div
                className={cx('flex gap-base transition-[margin]', {
                  'mb-sm xxxl:mb-base': isExpanded,
                })}>
                <div className='mr-auto'>
                  <h6 className='font-bold leading-base mb-xs max-w-[640px] xxxl:max-w-[840px]'>
                    {isLoading ? (
                      <div className='w-[120px]'>
                        <SkeletonRectangle size='full-width' />
                      </div>
                    ) : (
                      displayName || name
                    )}
                  </h6>
                  <div>
                    <PlanGroupProgress isLoading={isLoading} progressData={progressData} />
                  </div>
                </div>
                <div className='flex items-center gap-sm xxxl:gap-base'>
                  <div className='flex justify-center items-center font-medium text-xxs xxxl:text-xs'>
                    <div className='me-xxs xxxl:me-xs'>
                      {t('studentGoalReport.statementsCount')}
                    </div>
                    {isLoading ? (
                      <div className='w-base h-base'>
                        <SkeletonRectangle height='full-height' size='full-width' />
                      </div>
                    ) : (
                      <div className='flex justify-center items-center bg-neutral-200 group-hover:bg-white rounded-full min-w-[24px] min-h-[24px] xxxl:min-w-[32px] xxxl:min-h-[32px] px-xs py-xxs'>
                        {statements?.length || 0}
                      </div>
                    )}
                  </div>
                  <IconContainer
                    Icon={ChevronDownIcon}
                    className={chevronClassName}
                    paddingSize={isFullHD ? 'xs' : 'xxs'}
                    size='base'
                  />
                </div>
              </div>
              <AnimatePresence>
                {description && isExpanded && (
                  <motion.div
                    key='content'
                    animate='open'
                    className='flex flex-col gap-xs xxxl:gap-sm max-w-[680px] xxxl:max-w-[840px]'
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
                    <div className='font-bold text-xxxs xxxl:text-xxs uppercase'>
                      {t('studentGoalReport.description')}
                    </div>
                    <div className='text-font-secondary leading-lg text-xxs xxxl:text-xs'>
                      <InjectedContent content={description} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        <AnimatePresence>
          {statements && isExpanded && (
            <motion.div
              key='content'
              animate='open'
              className='flex flex-col gap-base xxxl:gap-md'
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
              {sortedStatements.map((statement, index) => (
                <Statement key={`${index}-${statement.name}`} statement={statement} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion.Content>
      {isExpanded && (
        <Accordion.Trigger asChild={true}>
          <IconButton
            Icon={ChevronUpIcon}
            circle={true}
            className='absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-white'
            size={isFullHD ? 'lg' : 'md'}
            variant='primary-outlined'
          />
        </Accordion.Trigger>
      )}
    </div>
  );
};
