import { gql } from '@apollo/client';

import { EVALUATION_RESULTS_VALUES, STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { TEvidence } from '@shared/resources/types';

export default gql`
  query PlanWithEvaluation($id: ID!) {
    plan(id: $id) {
      description
      evaluation {
        id
      }
      groups {
        description
        displayName
        id
        name
        statements {
          id
          evidences {
            contextType
            label
            rubricScores {
              currentScore
              maxScore
              label
            }
            service
            type
            updatedAt
            isTeamSubmission
            id
            itemId
          }
          name
          step
          isLocked
          isRequired
          question {
            id
            text
            questionType
            options {
              option
              id
            }
            answer {
              id
              answer
            }
          }
          results {
            createdAt
            evaluator {
              firstName
              lastName
              uuid
            }
            result
          }
          comments {
            createdAt
            author {
              firstName
              lastName
              uuid
            }
            body
          }
        }
        step
      }
      id
      name
      progress {
        completed
        total
      }
    }
  }
`;

type TPlanGroupStatementQuestion = {
  id: string;
  text: string;
  questionType: STATEMENT_QUESTION_TYPE;
  options: { option: string; id: string }[];
  answer: { id: string; answer: string[] } | null;
};

export type TPlanGroupStatement = {
  id: string;
  name: string;
  step: number;
  isLocked: boolean;
  isRequired: boolean;
  question: TPlanGroupStatementQuestion | null;
  evidences: TEvidence[];
  results: TEvaluationResult[];
  comments: TComment[];
};

export type TEvaluator = {
  firstName: string;
  lastName: string;
  uuid: string;
};

export type TComment = {
  createdAt: string;
  author: TEvaluator;
  body: string;
};

export type TEvaluationResult = {
  createdAt: string;
  evaluator: TEvaluator;
  result: EVALUATION_RESULTS_VALUES;
};

export type TEvaluation = {
  id: string;
};

export type TPlanGroup = {
  description: string;
  displayName: string;
  id: string;
  name: string;
  statements: TPlanGroupStatement[];
  step: number;
};

export type TPlanWithEvaluation = {
  description: string;
  evaluation: TEvaluation;
  groups: TPlanGroup[];
  id: string;
  name: string;
  progress: {
    completed: number;
    total: number;
  };
};

export type TPlanWithEvaluationData = {
  plan: TPlanWithEvaluation;
};

export type TPlanWithEvaluationVariables = {
  id: string;
};
