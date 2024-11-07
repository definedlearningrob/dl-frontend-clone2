import { gql } from '@apollo/client';

export default gql`
  query Pathways {
    pathways {
      id
      name
    }
  }
`;

export type TPathwaysData = {
  pathways: TPathway[];
};

type TPathway = {
  id: string;
  name: string;
};
