import { gql } from '@apollo/client';

export default gql`
  query Clusters {
    clusters {
      id
      name
      pathways {
        id
        name
      }
    }
  }
`;

export type TClustersData = {
  clusters: TCluster[];
};

type TCluster = {
  id: string;
  name: string;
  pathways: TPathway[];
};

type TPathway = {
  id: string;
  name: string;
};
