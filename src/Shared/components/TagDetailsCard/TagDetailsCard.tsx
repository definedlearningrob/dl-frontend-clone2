import { useTranslation } from 'react-i18next';
import { findLast } from 'lodash-es';
import dayjs from 'dayjs';

import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as TagIcon } from '@shared/assets/icons/tag_icon.svg';
import { TagDetailNumericIndicator } from '@shared/components/TagDetailsCard/TagDetailNumericIndicator';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { TTagSummary } from '@shared/graphql/user/query/tagsReport';
import { AggregationBarChart } from '@shared/components/AggregationBarChart/AggregationBarChart';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { TagChartTooltip } from '@shared/components/TagDetailsCard/TagChartTooltip';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  tagSummary: TTagSummary;
  aggregationPeriod: AGGREGATION_PERIOD;
};

const getDataPointName = (
  periodStart: string,
  periodEnd: string,
  aggregationPeriod: AGGREGATION_PERIOD
) => {
  const startDateLabel = dayjs(periodStart).format('MMMM YYYY');

  if (aggregationPeriod === AGGREGATION_PERIOD.MONTH) {
    return startDateLabel;
  }

  const endDateLabel = dayjs(periodEnd).format('MMMM YYYY');

  return `${startDateLabel} - ${endDateLabel}`;
};

export const TagDetailsCard = ({ tagSummary, aggregationPeriod }: Props) => {
  const { t } = useTranslation();

  const {
    tag: { name },
    cumulativeAverageScore,
    aggregationPeriods,
  } = tagSummary;

  const chartData = aggregationPeriods.map(({ periodStart, periodEnd, period, averageScore }) => ({
    colorClassName: 'fill-secondary-500',
    value: averageScore || 0,
    periodStart: dayjs(periodStart),
    periodEnd: dayjs(periodEnd),
    period,
    name: getDataPointName(periodStart, periodEnd, aggregationPeriod),
    tooltipIcon: CalendarIcon,
    iconClassName: 'text-neutral-800',
  }));

  const lastMeaningfulDatapoint = findLast(aggregationPeriods, (item) => item.averageScore > 0);

  return (
    <div className='bg-white gap-xs p-sm xxxl:p-base rounded-sm'>
      <div className='flex gap-xs text-neutral-800 items-center border-b border-neutral-200 pb-xs mb-xs'>
        <IconContainer Icon={TagIcon} paddingSize='none' />
        <h5 className='mb-0 text-xs xxxl:text-sm font-bold truncate'>{name}</h5>
      </div>
      <div className='py-xs px-md flex gap-xs xxxl:gap-sm grid-cols-2'>
        <TagDetailNumericIndicator
          score={cumulativeAverageScore}
          title={t('reports.graphCard.averageScore')}
          variant='primary'
        />
        <TagDetailNumericIndicator
          score={lastMeaningfulDatapoint?.averageScore || 0}
          title={
            <div className='flex gap-xxs items-center relative'>
              {t('reports.graphCard.mostRecentAverageScore')}
              <Tooltip
                className='absolute top-0 right-[-20px]'
                delayDuration={300}
                message={t('reports.graphCard.mostRecentAverageScoreInfo')}>
                <IconContainer
                  Icon={InfoIcon}
                  className='text-neutral-400 hover:text-primary-500'
                  paddingSize='none'
                  size='sm'
                />
              </Tooltip>
            </div>
          }
          variant='secondary'
        />
      </div>
      <div className='w-full h-[146px]'>
        <AggregationBarChart
          aggregationPeriod={aggregationPeriod}
          aggregationStartDate={dayjs(aggregationPeriods[0].periodStart)}
          data={chartData}
          highlightColorClassName='fill-chartSecondary-600'
          mainColorClassName='fill-chartPrimary-600'
          renderTooltipContent={(data, index) => (
            <TagChartTooltip
              averageScore={data.value}
              numberOfStudents={aggregationPeriods[index].studentsCount}
            />
          )}
        />
      </div>
    </div>
  );
};
