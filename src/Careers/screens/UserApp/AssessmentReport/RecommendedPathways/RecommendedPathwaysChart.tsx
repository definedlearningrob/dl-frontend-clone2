import { isEmpty, orderBy } from 'lodash-es';
import { useCallback, useMemo } from 'react';

import { ClusterRecommendationItem } from '@dc/graphql/user/queries/reportsAssessmentReport';
import { getStackedValues } from '@dc/screens/UserApp/AssessmentReport/RecommendedPathways/helpers';

import { ReactComponent as ColorMarker } from '@shared/svg/color_marker.svg';
import {
  StackedVerticalBarChart,
  StackedVerticalBarChartItem,
} from '@shared/components/StackedVerticalBarChart/StackedVerticalBarChart';
import { colorClassMap } from '@shared/components/StackedVerticalBarChart/helpers';

type Props = { clusterRecommendationCounts: ClusterRecommendationItem[] | undefined };

export const RecommendedPathwaysChart = ({ clusterRecommendationCounts }: Props) => {
  if (!clusterRecommendationCounts) {
    return null;
  }

  const sortedChartData = useMemo(
    () =>
      orderBy(clusterRecommendationCounts, 'recommendationsCount', 'desc').map(
        (clusterRecommendation, index) => {
          const stackedValues = getStackedValues(clusterRecommendation.pathwayRecommendationCounts);

          return {
            name: clusterRecommendation.cluster.name,
            value: clusterRecommendation.recommendationsCount,
            stackedValues,
            tooltipIcon: ColorMarker,
            tooltipClassName: 'max-w-[650px]',
            colorClassName: colorClassMap[index],
            index,
          };
        }
      ),
    [clusterRecommendationCounts]
  );

  const pathwayNameMap = useMemo(
    () =>
      clusterRecommendationCounts.reduce((acc, clusterRecommendation) => {
        clusterRecommendation.pathwayRecommendationCounts.forEach((pathwayRecommendationCount) => {
          if (!(pathwayRecommendationCount.pathway.id in acc)) {
            acc[pathwayRecommendationCount.pathway.id] = pathwayRecommendationCount.pathway.name;
          }
        });

        return acc;
      }, {} as Record<string, string>),
    [clusterRecommendationCounts]
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
    [pathwayNameMap, clusterRecommendationCounts]
  );

  return (
    <StackedVerticalBarChart data={sortedChartData} renderTooltipContent={renderTooltipContent} />
  );
};
