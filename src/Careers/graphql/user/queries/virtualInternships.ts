import { gql, TypedDocumentNode } from '@apollo/client';

import { TVirtualInternship } from '@dc/components/Admin/VirtualInternships/types';

export const VIRTUAL_INTERNSHIPS_QUERY: TypedDocumentNode<
  TVirtualInternshipsData,
  TVirtualInternshipsVariables
> = gql`
  query VirtualInternships($page: Int, $perPage: Int) {
    virtualInternships(page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        id
        opportunity {
          id
          name
          availableSpots
          creditsOutcomes
          description
          imageUrl
          opportunityType
          pathways {
            id
            name
          }
          salaryInformation
          tags
        }
        requiredExperiences
        status
      }
    }
  }
`;

export type TVirtualInternshipsVariables = {
  page: number;
  perPage: number;
};

export type TVirtualInternshipsData = {
  virtualInternships: {
    nodesCount: number;
    pagesCount: number;
    nodes: TVirtualInternship[];
  };
};
