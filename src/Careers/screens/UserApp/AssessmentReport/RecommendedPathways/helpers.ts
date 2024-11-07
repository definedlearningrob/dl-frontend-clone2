type Params = {
  recommendationsCount: number;
  pathway: { id: string; name: string };
}[];

export const getStackedValues = (pathwayRecommendationCounts: Params) =>
  pathwayRecommendationCounts.map((pathwayRecommendationCount) => {
    const pathwayId = pathwayRecommendationCount.pathway.id;

    return {
      id: pathwayId,
      value: pathwayRecommendationCount.recommendationsCount,
    };
  });
