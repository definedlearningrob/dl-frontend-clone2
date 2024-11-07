import { gql } from '@apollo/client';

import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';

export default gql`
  query StudentProjectProducts($id: ID!, $teamId: ID) {
    project: task(id: $id, teamId: $teamId) {
      id
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
        }
        submission {
          id
          canSubmit
          files {
            createdAt
            filename
            googleWeblink
            id
            source
            submitter {
              uuid
              firstName
              lastName
            }
            url(options: { responseContentDisposition: "attachment" })
            previewUrl: url
          }
          grade {
            updatedAt
            lastGradedBy {
              firstName
              lastName
            }
            pointsAvailable
            pointsScored
            results {
              criteriaId
              trait
            }
          }
          status
          updatedAt
        }
      }
    }
  }
`;

export type TStudentProjectProductsData = {
  project: {
    id: string;
    products: TProduct[];
  };
};

export type TStudentProjectProductsVariables = {
  id: string;
  teamId?: string;
};

export type TProduct = {
  description: string;
  displayName: string;
  id: string;
  name: string;
  rubrics: TRubric[];
  submission: TProductSubmission;
  submissionsGradingNeededCount: never;
};

export type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TCriteria[];
  description: string;
  displayName: string;
  headings: THeading[];
  pointsAvailable?: number;
  id: string;
  name: string;
};

export type TProductSubmission = {
  id: string;
  files: TProductSubmissionFile[];
  grade?: TProductSubmissionGrade;
  status: PRODUCT_SUBMISSION_STATUS;
  canSubmit: boolean;
  updatedAt?: string;
};

type TProductSubmissionGrade = {
  updatedAt: string;
  lastGradedBy: {
    firstName: string;
    lastName: string;
  };
  pointsAvailable: number;
  pointsScored: number;
  results: TSubmissionGradeResults[];
};

export type TSubmissionGradeResults = {
  criteriaId: string;
  trait?: string;
};

export type TProductSubmissionFile = {
  createdAt: string;
  filename: string;
  googleWeblink: string | null;
  id: string;
  source: string;
  isOwner?: boolean;
  submitter: {
    uuid: string;
    firstName: string | null;
    lastName: string | null;
  };
  url: string;
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
