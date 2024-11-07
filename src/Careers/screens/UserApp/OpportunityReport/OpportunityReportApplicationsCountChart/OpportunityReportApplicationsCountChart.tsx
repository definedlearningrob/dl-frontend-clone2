import { isEmpty, orderBy } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { OpportunityReportApplicationCountQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ColorMarker } from '@shared/svg/color_marker.svg';
import {
  StackedVerticalBarChart,
  StackedVerticalBarChartItem,
} from '@shared/components/StackedVerticalBarChart/StackedVerticalBarChart';
import { colorClassMap } from '@shared/components/StackedVerticalBarChart/helpers';

type Props = {
  clusterCountsData:
    | Get<OpportunityReportApplicationCountQuery, 'reports.opportunityReport.clusterCounts'>
    | undefined;
};

export const OpportunityReportApplicationsCountChart = ({ clusterCountsData }: Props) => {
  const { t } = useTranslation();

  if (!clusterCountsData) return null;

  if (isEmpty(clusterCountsData)) {
    return (
      <div className='flex items-center justify-center h-[350px]'>
        {t('careerExplorationReport.emptyResults')}
      </div>
    );
  }

  const sortedData = orderBy(clusterCountsData, 'applicationsCount', 'desc').map((item, index) => ({
    name: item.cluster.name,
    value: item.applicationsCount,
    stackedValues: item.pathwayApplicationCounts.map((pathway) => ({
      id: pathway.pathway.id,
      value: pathway.applicationsCount,
    })),
    tooltipIcon: ColorMarker,
    tooltipClassName: 'max-w-[650px]',
    colorClassName: colorClassMap[index],
    index,
  }));

  const pathwayNameMap = useMemo(
    () =>
      clusterCountsData.reduce((acc, clusterRecommendation) => {
        clusterRecommendation.pathwayApplicationCounts.forEach((pathwayRecommendationCount) => {
          if (!(pathwayRecommendationCount.pathway.id in acc)) {
            acc[pathwayRecommendationCount.pathway.id] = pathwayRecommendationCount.pathway.name;
          }
        });

        return acc;
      }, {} as Record<string, string>),
    [clusterCountsData]
  );

  const renderTooltipContent = useCallback(
    (data: StackedVerticalBarChartItem) => {
      const { stackedValues } = data;

      if (isEmpty(stackedValues)) return null;

      return stackedValues.map((value, index) => {
        const prefix = String.fromCharCode(97 + index).toUpperCase();

        return <div key={index}>{`${prefix}: ${pathwayNameMap[value.id]}: ${value.value}`}</div>;
      });
    },
    [pathwayNameMap, clusterCountsData]
  );

  return <StackedVerticalBarChart data={sortedData} renderTooltipContent={renderTooltipContent} />;
};
