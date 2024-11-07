import { gql } from '@apollo/client';

import { EVALUATION_RESULTS_VALUES } from '@shared/resources/enums';

export default gql`
  mutation EvaluateStudent($input: EvaluateStudentMutationInput!) {
    evaluateStudent(input: $input) {
      evaluation {
        id
        results {
          createdAt
          evaluator {
            firstName
            lastName
            uuid
          }
          result
          statement {
            id
          }
        }
      }
    }
  }
`;

export type TEvaluator = {
  firstName: string;
  lastName: string;
  uuid: string;
};

export type TEvaluationResult = {
  createdAt: string;
  evaluator: TEvaluator;
  result: EVALUATION_RESULTS_VALUES;
  statement: {
    id: string;
  };
};

export type TEvaluation = {
  id: string;
  results: TEvaluationResult[];
};

export type TEvaluateStudentData = {
  evaluateStudent: {
    evaluation: TEvaluation;
  };
};

export type TEvaluationResultAttributes = {
  statementId: string;
  result: EVALUATION_RESULTS_VALUES;
};

export type TEvaluateStudentMutationInput = {
  evaluationId: string;
  studentUuid?: string;
  results: TEvaluationResultAttributes[];
};

export type EvaluateStudentVariables = {
  input: TEvaluateStudentMutationInput;
  statementId: string;
};
