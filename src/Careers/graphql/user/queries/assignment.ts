import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@apollo/client';

export const ASSIGNMENT_QUERY: TypedDocumentNode<TAssignmentData, TAssignmentVariables> = gql`
  query Assignment($id: ID!) {
    assignment(id: $id) {
      archivedAt
      assetName
      badges {
        id
        name
        imageUrl
      }
      description
      displayName
      id
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
      }
    }
  }
`;

type TBadge = {
  id: string;
  name: string;
  imageUrl: string;
};

type TCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
};

type TRubricCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

type TRubricHeading = {
  id: string;
  multiplier: number;
  name: string;
};

type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TRubricCriteria[];
  description: string;
  headings: TRubricHeading[];
  id: string;
  name: string;
  displayName: string;
};

type TAssignment = {
  archivedAt: string;
  assetName: string;
  badges: TBadge[];
  description: string;
  displayName: string;
  id: string;
  rubrics: TRubric[];
};

type TAssignmentData = {
  assignment: TAssignment;
};

type TAssignmentVariables = {
  id: string;
};
