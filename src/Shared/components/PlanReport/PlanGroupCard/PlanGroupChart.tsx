import { match } from 'ts-pattern';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { times } from 'lodash-es';

import { PieChart } from '@shared/components/PieChart';
import { SimpleBarChart } from '@shared/components/SimpleBarChart/SimpleBarChart';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import { PlanGroupData } from './types';

type Props = {
  chartType: 'bar' | 'pie';
  isLoading?: boolean;
  data?: PlanGroupData;
  total?: number;
};

const BAR_GAP = 4;

export const PlanGroupChart = ({ chartType, data, isLoading = false, total = 0 }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const chartSize = isFullHD ? 164 : 124;
  const barChartMargin = (isFullHD ? 6 : 2) - BAR_GAP;

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        name: t('common.statuses.notStarted'),
        value: data.notStarted,
        colorClassName: 'fill-neutral-500',
        tooltipIcon: NotStartedIcon,
      },
      {
        name: t('common.statuses.inProgress'),
        value: data.inProgress,
        colorClassName: 'fill-secondary-500',
        tooltipIcon: InProgressIcon,
      },
      {
        name: t('common.statuses.completed'),
        value: data.completed,
        colorClassName: 'fill-success-500',
        tooltipIcon: CompletedIcon,
      },
      {
        name: t('common.statuses.notMet'),
        value: data.notMet,
        colorClassName: 'fill-danger-500',
        tooltipIcon: NotMetIcon,
      },
    ];
  }, [data]);

  const renderChartTooltipContent = (data: { name: string; value: number }) => {
    const percentage = Math.round((data.value / total) * 100);

    return (
      <div className='flex flex-col gap-xxs whitespace-nowrap'>
        <span>{t('planReport.percentage', { value: percentage })}</span>
        <span>{t('planReport.numberOfStudents', { count: data.value })}</span>
      </div>
    );
  };

  return match({ chartType, isLoading })
    .with({ chartType: 'bar', isLoading: true }, () => (
      <div className='flex justify-between gap-xxs w-[120px] xxxl:w-[152px] h-[124px] xxxl:h-[164px]'>
        {times(4, (index) => (
          <SkeletonRectangle key={index} className='!rounded-xxs' />
        ))}
      </div>
    ))
    .with({ chartType: 'bar', isLoading: false }, () => (
      <SimpleBarChart
        data={chartData}
        height={chartSize}
        margin={{ top: 0, left: barChartMargin, right: barChartMargin, bottom: 0 }}
        max={total}
        renderTooltipContent={renderChartTooltipContent}
        width={chartSize}
        xAxisProps={{ hide: true }}
        yAxisProps={{ hide: true }}
      />
    ))
    .with({ chartType: 'pie', isLoading: true }, () => (
      <SkeletonRectangle className='!w-[124px] !h-[124px] xxxl:!w-[164px] xxxl:!h-[164px] !rounded-full' />
    ))
    .with({ chartType: 'pie', isLoading: false }, () => (
      <PieChart
        data={chartData}
        height={chartSize}
        renderTooltipContent={renderChartTooltipContent}
        width={chartSize}
      />
    ))
    .exhaustive();
};
