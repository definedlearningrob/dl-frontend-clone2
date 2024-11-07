import { gql } from '@apollo/client';

import { TOpportunity as TBaseOpportunity } from '@dc/resources/types';

export default gql`
  query MyOpportunities($page: Int, $perPage: Int) {
    myOpportunities(page: $page, perPage: $perPage) {
      nodes {
        applicationStatus
        id
        imageUrl
        isFavorite
        name
        opportunityType
        partner {
          id
          name
        }
        periodStart
        periodEnd
        deadline
        virtualInternship {
          id
          roadmapItemsCount
          requiredExperiences
          readinessSkillsLessons {
            id
          }
          status
        }
        pathways {
          id
          name
        }
        partner {
          id
          name
        }
        imageFitToContainer
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TMyOpportunitiesData = {
  myOpportunities: TMyOpportunities;
};

export type TMyOpportunities = {
  nodes: TOpportunity[];
  nodesCount: number;
  pagesCount: number;
};

type TPathway = Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>;

type TOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'name'
  | 'applicationStatus'
  | 'isFavorite'
  | 'imageUrl'
  | 'opportunityType'
  | 'deadline'
  | 'periodStart'
  | 'periodEnd'
  | 'virtualInternship'
  | 'partner'
  | 'imageFitToContainer'
> & {
  pathways: TPathway[];
};
