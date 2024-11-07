import { gql } from '@apollo/client';

import { EVALUATION_RESULTS_VALUES, STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { TEvidence } from '@shared/resources/types';

export default gql`
  query StudentPortfolioPlanWithEvaluation($uuid: ID!, $id: ID!) {
    student(uuid: $uuid) {
      portfolio {
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
              isLocked
              isRequired
              name
              step
              evidences {
                contextType
                label
                isTeamSubmission
                rubricScores {
                  currentScore
                  maxScore
                  label
                }
                service
                type
                updatedAt
                itemId
                id
              }
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
        studentId
      }
      uuid
    }
  }
`;

export type TPlanGroupStatementQuestion = {
  id: string;
  text: string;
  questionType: STATEMENT_QUESTION_TYPE;
  options: { option: string; id: string }[];
  answer: { id: string; answer: string[] } | null;
};

export type TPlanGroupStatement = {
  id: string;
  isLocked: boolean;
  isRequired: boolean;
  name: string;
  step: number;
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

export type TStudentPortfolioPlanWithEvaluation = {
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

export type TStudentPortfolioPlanWithEvaluationData = {
  student: {
    portfolio: {
      plan: TStudentPortfolioPlanWithEvaluation;
      studentId: string;
    };
    uuid: string;
  };
};

export type TStudentPortfolioPlanWithEvaluationVariables = {
  uuid: string;
  id: string;
};
