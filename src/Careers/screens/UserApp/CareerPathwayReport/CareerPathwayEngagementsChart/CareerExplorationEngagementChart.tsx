import { isEmpty, orderBy } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { CareerExplorationReportVisitCountsQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ColorMarker } from '@shared/svg/color_marker.svg';
import {
  StackedVerticalBarChart,
  StackedVerticalBarChartItem,
} from '@shared/components/StackedVerticalBarChart/StackedVerticalBarChart';
import { colorClassMap } from '@shared/components/StackedVerticalBarChart/helpers';

type Props = {
  visitCountsData:
    | Get<CareerExplorationReportVisitCountsQuery, 'reports.pathwayReport.visitCounts'>
    | undefined;
};

export const CareerExplorationEngagementChart = ({ visitCountsData }: Props) => {
  const { t } = useTranslation();

  if (!visitCountsData) return null;

  if (isEmpty(visitCountsData)) {
    return (
      <div className='flex items-center justify-center h-[250px]'>
        {t('careerExplorationReport.emptyResults')}
      </div>
    );
  }

  const sortedData = orderBy(visitCountsData, 'visitsCount', 'desc').map((item, index) => ({
    name: item.cluster.name,
    value: item.visitsCount,
    stackedValues: item.pathwayVisitCounts.map((pathway) => ({
      id: pathway.pathway.id,
      value: pathway.visitsCount,
    })),
    tooltipIcon: ColorMarker,
    tooltipClassName: 'max-w-[650px]',
    colorClassName: colorClassMap[index],
    index,
  }));

  const pathwayNameMap = useMemo(
    () =>
      visitCountsData.reduce((acc, clusterRecommendation) => {
        clusterRecommendation.pathwayVisitCounts.forEach((pathwayRecommendationCount) => {
          if (!(pathwayRecommendationCount.pathway.id in acc)) {
            acc[pathwayRecommendationCount.pathway.id] = pathwayRecommendationCount.pathway.name;
          }
        });

        return acc;
      }, {} as Record<string, string>),
    [visitCountsData]
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
    [pathwayNameMap, visitCountsData]
  );

  return <StackedVerticalBarChart data={sortedData} renderTooltipContent={renderTooltipContent} />;
};
