import { TClustersData } from '@dc/graphql/shared/queries/clusters';

type TClusters = TClustersData['clusters'];

export const getPathwayName = (pathwayId: string, clusters: TClusters) => {
  const checkedPathway = clusters
    .flatMap((cluster) => cluster.pathways)
    .find((pathway) => pathway.id === pathwayId);

  return checkedPathway!.name;
};
