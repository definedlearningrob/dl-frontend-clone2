import { gql } from '@apollo/client';

export default gql`
  query PublicProjectProducts($shareId: ID!, $code: String!) {
    project: task(shareId: $shareId, code: $code) {
      id
      products {
        id
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
      }
    }
  }
`;

export type TPublicProjectProductsData = {
  project: {
    id: string;
    products: TProduct[];
  };
};

export type TPublicProjectProductsVariables = {
  shareId: string;
  code: string;
};

export type TProduct = {
  description: string;
  displayName: string;
  id: string;
  name: string;
  rubrics: TRubric[];
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
