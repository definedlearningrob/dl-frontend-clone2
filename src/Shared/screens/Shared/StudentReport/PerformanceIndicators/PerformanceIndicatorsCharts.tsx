import { useTranslation } from 'react-i18next';
import { isEmpty, times } from 'lodash-es';

import { ReactComponent as TagIcon } from '@shared/svg/tag_icon.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Badge } from '@shared/components/Badge/Badge';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import { ReactComponent as EmptyBarChart } from '@shared/assets/images/empty-bar-chart.svg';
import { TPerformanceIndicatorsData } from '@shared/graphql/fragments/goalPerformanceIndicatorsData';

import { GradesBarChart } from '../GradesBarChart/GradesBarChart';
import { GradesBarChartTooltipContent } from '../GradesBarChart/GradesBarChartTooltipContent';

import { PerformanceIndicatorsChartSkeleton } from './PerformanceIndicatorsChartSkeleton';

type Props = {
  chartsData: TPerformanceIndicatorsData | undefined;
  isLoading?: boolean;
};

export const PerformanceIndicatorsCharts = ({ chartsData, isLoading }: Props) => {
  const { t } = useTranslation();

  const wrapperClasses =
    'flex flex-col gap-sm xxxl:gap-base p-sm xxxl:p-base bg-neutral-200 rounded-sm';

  if (isLoading) {
    return (
      <div className={wrapperClasses}>
        {times(3, (index) => (
          <PerformanceIndicatorsChartSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isEmpty(chartsData)) {
    return (
      <div className='py-2lg'>
        <EmptyState
          heading={t('studentGoalReport.emptyPerformanceIndicators')}
          headingClassName='text-xs xxxl:text-sm'
          icon={<EmptyBarChart />}>
          <p className='text-center m-0 text-xxs xxxl:text-xs'>
            {t('studentGoalReport.emptyPerformanceIndicatorsInfo')}
          </p>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {chartsData!.map(({ tag, averageScore, results }) => (
        <div
          key={tag.name}
          className='bg-white p-sm xxxl:p-base rounded-sm'
          data-testid='performance-indicators-chart'>
          <div className='flex justify-between items-center mb-xs xxxl:mb-sm'>
            <div className='flex items-center gap-xs'>
              <IconContainer Icon={TagIcon} paddingSize='none' />
              <h6 className='text-xs xxxl:text-sm mb-0'>{tag.name}</h6>
              <span className='font-medium text-xxs xxxl:text-xs text-font-secondary'>
                ({t('studentGoalReport.grades', { count: results.length })})
              </span>
            </div>
            <div className='flex items-center gap-xs'>
              <span className='font-medium text-xxs xxxl:text-xs text-font-secondary'>
                {t('studentGoalReport.averageScore')}
              </span>
              <Badge className='px-xs py-xxs !rounded-full' size='small' type='neutral'>
                {averageScore}
              </Badge>
            </div>
          </div>
          <GradesBarChart data={results} renderTooltipContent={GradesBarChartTooltipContent} />
        </div>
      ))}
    </div>
  );
};
