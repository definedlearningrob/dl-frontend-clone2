import { gql } from '@apollo/client';

import { OPPORTUNITY_TYPE } from '@dc/resources/enums';
import {
  TOpportunity as TBaseOpportunity,
  TVirtualInternship as TBaseVirtualInternship,
} from '@dc/resources/types';

export default gql`
  query StudentOpportunities($page: Int, $perPage: Int, $filter: StudentOpportunityFilter) {
    opportunities(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        name
        applicationStatus
        isFavorite
        isRecommended
        imageUrl
        opportunityType
        deadline
        periodStart
        partner {
          id
          name
        }
        periodEnd
        virtualInternship {
          id
          requiredExperiences
          roadmapItemsCount
          readinessSkillsLessons {
            id
          }
          status
        }
        pathways {
          id
          name
        }
        imageFitToContainer
      }
    }
  }
`;

export type TOpportunitiesVariables = {
  page: number;
  perPage: number;
  filter?: TOpportunitiesFilter;
};

export type TOpportunitiesData = {
  opportunities: {
    nodesCount: number;
    pagesCount: number;
    nodes: TOpportunity[];
  };
};

type TPathway = Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>;

type TVirtualInternship = Pick<
  TBaseVirtualInternship,
  'id' | 'requiredExperiences' | 'roadmapItemsCount' | 'status'
> & {
  readinessSkillsLessons: {
    id: string;
  }[];
};

export type TOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'name'
  | 'applicationStatus'
  | 'isFavorite'
  | 'isRecommended'
  | 'imageUrl'
  | 'opportunityType'
  | 'deadline'
  | 'periodStart'
  | 'periodEnd'
  | 'partner'
  | 'imageFitToContainer'
> & {
  pathways: TPathway[];
  virtualInternship: TVirtualInternship | null;
};

type TOpportunitiesFilter = {
  nameCont?: string;
  pathwaysIdIn?: string[];
  tagsContain?: string[];
  typeEq?: OPPORTUNITY_TYPE;
};
