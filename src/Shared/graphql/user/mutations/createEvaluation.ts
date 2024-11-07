import { gql } from '@apollo/client';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';

export default gql`
  mutation CreateEvaluation($input: CreateEvaluationMutationInput!) {
    createEvaluation(input: $input) {
      evaluation {
        id
        results {
          createdAt
          evaluator {
            email
            firstName
            lastName
            username
            uuid
          }
          result
          statement {
            id
            isLocked
            name
            step
          }
        }
      }
    }
  }
`;

export type TStatement = {
  id: string;
  isLocked: boolean;
  name: string;
  step: number;
};

export type TEvaluator = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  uuid: string;
};

export type TEvaluationResult = {
  createdAt: string;
  evaluator: TEvaluator;
  result: EVALUATION_RESULTS_VALUES;
  statement: TStatement;
};

export type TEvaluation = {
  id: string;
  results: TEvaluationResult[];
};

export type TCreateEvaluationMutationInput = {
  studentUuid?: string;
  planId: string;
};

export type TCreateEvaluationData = {
  createEvaluation: {
    evaluation: TEvaluation;
  };
};
