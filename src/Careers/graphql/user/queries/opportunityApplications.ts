import { gql, TypedDocumentNode } from '@apollo/client';

import { TOpportunity } from '@dc/resources/types';

export const OPPORTUNITY_APPLICATIONS_QUERY: TypedDocumentNode<
  TOpportunityData,
  TOpportunityApplicationVariables
> = gql`
  query OpportunityApplications(
    $id: ID!
    $page: Int
    $perPage: Int
    $filter: OpportunityApplicationFilter
  ) {
    opportunity(id: $id) {
      filteredApplications: applications(page: $page, perPage: $perPage, filter: $filter) {
        pagesCount
        nodesCount
        nodes {
          answers {
            id
            answer
            opportunityQuestionId
          }
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
      applications(page: $page, perPage: $perPage) {
        pagesCount
        nodesCount
        nodes {
          lastChangedBy {
            uuid
            name
          }
          answers {
            id
            answer
            opportunityQuestionId
          }
          id
          appliedAt
          updatedAt
          status
          student {
            uuid
            fullName
          }
        }
      }
      automaticAcceptance
      hasPendingApplications
      id
      name
      opportunityType
      questions {
        id
        question
        step
      }
    }
  }
`;

export type TOpportunityApplications = Pick<
  TOpportunity,
  | 'applications'
  | 'automaticAcceptance'
  | 'hasPendingApplications'
  | 'id'
  | 'name'
  | 'opportunityType'
  | 'questions'
> & {
  filteredApplications: TOpportunity['applications'];
};

export type TOpportunityData = {
  opportunity: TOpportunityApplications;
};

export type TOpportunityApplicationFilter = {
  studentFullNameCont: string;
};

export type TOpportunityApplicationVariables = {
  id: string;
  perPage?: number;
  page?: number;
  filter?: TOpportunityApplicationFilter;
};
