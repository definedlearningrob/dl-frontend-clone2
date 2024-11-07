import { gql } from '@apollo/client';

export const PLAN_IN_STUDENT_REPORT_FRAGMENT = gql`
  fragment PlanForStudentReport on Plan {
    name
    id
    groups {
      id
      name
      step
      displayName
      description
      statements {
        id
        step
        results {
          createdAt
          result
        }
        name
        isRequired
        question {
          id
          text
          questionType
          options {
            id
            option
          }
          answer {
            id
            answer
          }
        }
        evidences {
          label
          type
          contextType
          service
          updatedAt
          itemId
          isTeamSubmission
          id
          rubricScores {
            label
            maxScore
            currentScore
          }
        }
      }
    }
  }
`;
