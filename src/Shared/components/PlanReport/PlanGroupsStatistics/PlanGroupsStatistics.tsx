import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { isNil } from 'lodash-es';

import { ReactComponent as PieChartIcon } from '@shared/svg/pie_chart_outline.svg';
import { ReactComponent as BarChartIcon } from '@shared/svg/chart_bar_2.svg';
import SharedCard from '@shared/components/Card/Card';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { TPlanReportData } from '@shared/graphql/user/query/planReport';

import { PlanGroupsLegend } from './PlanGroupsLegend';
import { PlanGroupList } from './PlanGroupList';

type Props = {
  isLoading: boolean;
  planReportData: TPlanReportData | undefined;
};

export const PlanGroupsStatistics = ({ planReportData, isLoading }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const [selectedChartType, setSelectedChartType] = useState<'pie' | 'bar'>('pie');

  const iconButtonSize = isFullHD ? 'lg' : 'md';
  const planGroups = planReportData?.reports.planReport.groups;
  const planGroupsCount = planGroups?.length;

  return (
    <SharedCard>
      <div className='flex gap-sm items-start'>
        <div className='flex-1'>
          <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
            {t('planReport.planGroups')}
            {!isNil(planGroupsCount) && (
              <span className='text-neutral-600'> ({planGroupsCount})</span>
            )}
          </h5>
          <p className='text-xs xxxl:text-sm leading-lg xxxl:mb-base'>
            {t('planReport.planGroupsInfo')}
          </p>
        </div>
        <div className='flex items-center gap-sm text-xxs xxxl:text-xs font-medium'>
          {t('planReport.chartType')}
          <div className='flex gap-xs'>
            <IconButton
              Icon={PieChartIcon}
              size={iconButtonSize}
              variant={selectedChartType === 'pie' ? 'primary' : 'default'}
              onClick={() => setSelectedChartType('pie')}
            />
            <IconButton
              Icon={BarChartIcon}
              size={iconButtonSize}
              variant={selectedChartType === 'bar' ? 'primary' : 'default'}
              onClick={() => setSelectedChartType('bar')}
            />
          </div>
        </div>
      </div>
      <PlanGroupsLegend />
      <PlanGroupList
        chartType={selectedChartType}
        groupReports={planGroups}
        isLoading={isLoading}
      />
    </SharedCard>
  );
};
