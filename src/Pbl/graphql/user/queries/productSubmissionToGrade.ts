import { gql } from '@apollo/client';

import { TRubric } from '@pbl/components/Project/types';

import { TFile } from '@shared/resources/types';

export default gql`
  query ProductSubmissionToGrade(
    $projectId: ID!
    $productId: ID!
    $submitterUuid: ID!
    $submitterType: ProductSubmissionSubmitterTypes!
  ) {
    project: task(id: $projectId) {
      id
      displayName
      product(id: $productId) {
        id
        displayName
        submission(submitterUuid: $submitterUuid, submitterType: $submitterType) {
          id
          updatedAt
          files {
            createdAt
            filename
            googleWeblink
            id
            source
            url(options: { responseContentDisposition: "attachment" })
            submitter {
              uuid
              firstName
              lastName
            }
          }
          grade {
            lastGradedBy {
              uuid
              name
            }
            updatedAt
            pointsAvailable
            pointsScored
            results {
              criteriaId
              trait
            }
          }
        }
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
          pointsAvailable
        }
      }
    }
  }
`;

export type TProductSubmissionToGradeData = {
  project: {
    id: string;
    displayName: string;
    product: TProduct;
  };
};

export type TProductSubmissionToGradeVariables = {
  projectId: string;
  productId: string;
  submitterUuid: string;
  submitterType: string;
};

type TProduct = {
  id: string;
  displayName: string;
  submission: TProductSubmission | null;
  rubrics: ExtendedRubric[];
};

export type TProductSubmission = {
  id: string;
  updatedAt: string;
  files: TFile[];
  grade?: TProductSubmissionGrade;
};

type TProductSubmissionGrade = {
  id: string;
  lastGradedBy: {
    uuid: string;
    name: string;
  };
  updatedAt: string;
  pointsAvailable: number;
  pointsScored: number;
  results: {
    criteriaId: string;
    trait: string;
  }[];
};

export type ExtendedRubric = TRubric & {
  pointsAvailable: number;
};
