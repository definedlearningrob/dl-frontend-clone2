import { gql, TypedDocumentNode } from '@apollo/client';
import { OpportunityTypes } from '@graphql/dc/shared/types';
import { Opportunity, Partner } from '@graphql/dc/users/types';

import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import { TOpportunity as TBaseOpportunity } from '@dc/resources/types';

export const OPPORTUNITIES_QUERY: TypedDocumentNode<
  TOpportunitiesData,
  TOpportunitiesVariables
> = gql`
  query UserOpportunities($page: Int, $perPage: Int, $filter: OpportunityFilter) {
    opportunities(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        createdAt
        name
        opportunityType
        periodEnd
        periodStart
        deadline
        visibilityScope
        hasPendingApplications
        imageUrl
        thumbnailUrl
        entities {
          uuid
        }
        partner {
          id
          name
        }
        pathways {
          name
        }
        imageFitToContainer
      }
    }
  }
`;

export type TOpportunitiesVariables = {
  page?: number;
  perPage?: number;
  filter?: TOpportunitiesFilter;
};

export type TOpportunitiesData = {
  opportunities: {
    nodesCount: number;
    pagesCount: number;
    nodes: (Pick<
      TOpportunity,
      | 'id'
      | 'name'
      | 'opportunityType'
      | 'periodEnd'
      | 'periodStart'
      | 'deadline'
      | 'visibilityScope'
      | 'createdAt'
      | 'hasPendingApplications'
      | 'imageUrl'
      | 'thumbnailUrl'
      | 'virtualInternship'
      | 'imageFitToContainer'
    > & {
      entities: Pick<Opportunity['entities'][number], 'uuid'>[];
      pathways: Pick<TBaseOpportunity['pathways'][number], 'name'>[];
      partner: Pick<Partner, 'id' | 'name'> | null;
    })[];
  };
};

type TOpportunitiesFilter = {
  nameCont?: string;
  pathwaysIdIn?: string[];
  tagsContain?: string[];
  typeEq?: OpportunityTypes;
};

export const OPPORTUNITY_QUERY: TypedDocumentNode<TOpportunityData, TOpportunityVariables> = gql`
  query UserOpportunity(
    $id: ID!
    $page: Int
    $perPage: Int
    $filter: OpportunityApplicationFilter
    $track: Boolean
  ) {
    opportunity(id: $id, track: $track) {
      id
      name
      automaticAcceptance
      availableSpots
      creditsOutcomes
      description
      imageUrl
      location
      opportunityType
      pathways {
        id
        name
      }
      salaryInformation
      tags
      deadline
      periodEnd
      periodStart
      applications(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          id
          appliedAt
          updatedAt
          status
          student {
            uuid
            fullName
            schoolClasses {
              uuid
              name
            }
          }
        }
      }
      entities {
        uuid
        name
      }
      visibilityScope
      hasPendingApplications
      virtualInternship {
        id
      }
      partner {
        id
        name
      }
      imageFitToContainer
      thumbnailUrl
    }
  }
`;

export type TOpportunityData = {
  opportunity: TOpportunity;
};

export type TOpportunityApplicationFilter = {
  studentFullNameCont: string;
};

type TOpportunityVariables = {
  id: string;
  perPage?: number;
  page?: number;
  filter?: TOpportunityApplicationFilter;
  track: boolean;
};

export const CREATE_OPPORTUNITY_MUTATION: TypedDocumentNode<
  TCreateOpportunityData,
  TCreateOpportunityVariables
> = gql`
  mutation CreateOpportunity($input: CreateOpportunityMutationInput!) {
    createOpportunity(input: $input) {
      opportunity {
        description
        name
        opportunityType
        pathways {
          id
          name
        }
        automaticAcceptance
        availableSpots
        creditsOutcomes
        entities {
          uuid
          name
        }
        visibilityScope
        imageUrl
        location
        tags
        salaryInformation
        periodStart
        periodEnd
        deadline
        id
        partner {
          id
          name
        }
      }
    }
  }
`;

type TCreateOpportunityData = {
  createOpportunity: {
    opportunity: TSaveOpportunity;
  };
};

type TCreateOpportunityVariables = {
  input: {
    imageFilename?: string | null;
    imageUuid?: string | null;
    description: string;
    name: string;
    opportunityType: OpportunityTypes;
    pathwayIds: string[];
    automaticAcceptance: boolean;
    availableSpots: number;
    creditsOutcomes: string;
    location: string | null;
    tags: string[];
    salaryInformation: string | null;
    periodStart: Date | null;
    periodEnd: Date | null;
    deadline: Date | null;
    visibilityScope: VISIBILITY_SCOPE;
    entityUuids: string[];
    partnerId: string | null;
  };
};

export const UPDATE_OPPORTUNITY_MUTATION: TypedDocumentNode<
  TUpdateOpportunityData,
  TUpdateOpportunityVariables
> = gql`
  mutation UpdateOpportunity($input: UpdateOpportunityMutationInput!) {
    updateOpportunity(input: $input) {
      opportunity {
        id
        name
        automaticAcceptance
        availableSpots
        creditsOutcomes
        description
        imageUrl
        location
        opportunityType
        pathways {
          id
          name
        }
        entities {
          uuid
          name
        }
        salaryInformation
        tags
        deadline
        periodEnd
        periodStart
        visibilityScope
        partner {
          id
          name
        }
      }
    }
  }
`;

type TUpdateOpportunityData = {
  updateOpportunity: {
    opportunity: TSaveOpportunity;
  };
};

type TUpdateOpportunityVariables = {
  input: {
    id: string;
    description: string;
    name: string;
    opportunityType: OpportunityTypes;
    pathwayIds: string[];
    automaticAcceptance: boolean;
    availableSpots: number;
    creditsOutcomes: string;
    imageFilename?: string;
    imageUuid?: string;
    location: string | null;
    tags: string[];
    salaryInformation: string | null;
    periodStart: Date | null;
    periodEnd: Date | null;
    deadline: Date | null;
    visibilityScope: VISIBILITY_SCOPE;
    entityUuids: string[];
    partnerId: string | null;
  };
};

export const ARCHIVE_OPPORTUNITY: TypedDocumentNode<
  TArchiveOpportunityData,
  TArchiveOpportunityVariables
> = gql`
  mutation ArchiveOpportunity($input: ArchiveOpportunityMutationInput!) {
    archiveOpportunity(input: $input) {
      opportunity {
        id
      }
    }
  }
`;

type TArchiveOpportunityData = {
  archiveOpportunity: {
    opportunity: { id: string };
  };
};

type TArchiveOpportunityVariables = {
  input: { id: string };
};

type TSaveOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'name'
  | 'automaticAcceptance'
  | 'entities'
  | 'availableSpots'
  | 'creditsOutcomes'
  | 'description'
  | 'imageUrl'
  | 'thumbnailUrl'
  | 'location'
  | 'opportunityType'
  | 'salaryInformation'
  | 'tags'
  | 'deadline'
  | 'periodEnd'
  | 'periodStart'
  | 'partner'
> & {
  pathways: Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>[];
};

export type TOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'createdAt'
  | 'name'
  | 'automaticAcceptance'
  | 'availableSpots'
  | 'creditsOutcomes'
  | 'description'
  | 'imageUrl'
  | 'thumbnailUrl'
  | 'entities'
  | 'location'
  | 'opportunityType'
  | 'salaryInformation'
  | 'tags'
  | 'deadline'
  | 'periodStart'
  | 'periodEnd'
  | 'applications'
  | 'visibilityScope'
  | 'hasPendingApplications'
  | 'partner'
  | 'imageFitToContainer'
> & {
  pathways: Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>[];
  virtualInternship: { id: string } | null;
};
