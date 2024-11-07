import { gql, TypedDocumentNode } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

export const RUBRIC_QUERY: TypedDocumentNode<TRubricData, TRubricVariables> = gql`
  query DcRubric($id: ID!) {
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
        statements {
          id
        }
        id
        multiplier
        name
        tags {
          id
          name
          type
        }
        plans {
          description
          evaluation {
            id
            plan {
              name
            }
            student {
              username
              uuid
            }
          }
          groups {
            description
            name
            id
            statements {
              id
              name
            }
          }
          id
          name
        }
      }
      displayName
      id
      name
      canEdit
    }
  }
`;

export type TRubricCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
};

export type TRubricCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

export type TRubricHeadingPlanEvaluation = {
  id: string;
  plan: {
    name: string;
  };
  student: {
    username: string;
    uuid: string;
  };
};

export type TRubricHeadingPlanStatement = {
  id: string;
  name: string;
};

export type TRubricHeadingPlanGroup = {
  description: string;
  name: string;
  statements: TRubricHeadingPlanStatement[];
};

export type TRubricHeadingPlan = {
  description: string;
  evaluation: TRubricHeadingPlanEvaluation[];
  groups: TRubricHeadingPlanGroup[];
  id: string;
  name: string;
};

export type TRubricHeading = {
  id: string;
  multiplier: number;
  name: string;
  plans: TRubricHeadingPlan[];
  tags: Pick<TTag, 'name' | 'id' | 'type'>[];
  statements: { id: string }[];
};

export type TRubric = {
  criteriaLabels: TRubricCriteriaLabel[];
  criterias: TRubricCriteria[];
  description: string;
  headings: TRubricHeading[];
  displayName: string;
  id: string;
  name: string;
  canEdit: boolean;
};

export type TRubricVariables = {
  id: string;
};

export type TRubricData = {
  rubric: TRubric;
};
