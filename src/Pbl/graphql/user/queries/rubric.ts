import { gql } from '@apollo/client';

export default gql`
  query DlRubric($id: ID!) {
    rubric(id: $id) {
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
      name
      displayName
      id
      canEdit
    }
  }
`;

export type TRubricData = {
  rubric: TRubric;
};

export type TRubricVariables = {
  id: string;
};

export type TRubric = {
  criteriaLabels: TCriteriaLabel[];
  criterias: TCriteria[];
  description: string;
  displayName: string;
  headings: THeading[];
  id: string;
  name: string;
  canEdit: boolean;
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
  statements: { id: string }[];
};
