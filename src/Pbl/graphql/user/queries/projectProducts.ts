import { gql } from '@apollo/client';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query UserProjectProducts($projectId: ID!, $code: String) {
    project: task(id: $projectId, code: $code) {
      id
      assignedStudentsCount
      products {
        description
        displayName
        id
        name
        rubrics {
          criteriaLabels {
            displayName
            id
            score
          }
          criterias {
            id
            rubricCriteriaLabelId
            rubricHeadingId
            text
          }
          description
          headings {
            id
            multiplier
            name
          }
          id
          name
          displayName
          hasAlignedStatements
        }
        submissionsGradingNeededCount
        hidden
        quickTask {
          id
        }
      }
    }
  }
`;

export type TProjectProductsData = {
  project: {
    id: string;
    assignedStudentsCount: number;
    products: TProduct[];
  };
};

export type TProjectProductsVariables = {
  code?: string;
  projectId: string;
};

export type TProduct = {
  description: string;
  displayName: string;
  id: string;
  name: string;
  rubrics: TRubric[];
  submissionsGradingNeededCount: number;
  hidden: boolean;
  quickTask: TTask;
};

export type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TCriteria[];
  description: string;
  displayName: string;
  headings: THeading[];
  id: string;
  name: string;
  pointsAvailable?: number;
  hasAlignedStatements: boolean;
};

type TCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
};

type TCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

type THeading = {
  id: string;
  multiplier: number;
  name: string;
};
export type TTask = {
  archivedAt: string;
  id: string;
  imageUrl: string;
  name: string;
  owner: {
    name: string;
    uuid: string;
  };
  status: ContentStatusesTypes;
  thumbnailUrl: string;
};
