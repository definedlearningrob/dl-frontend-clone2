import { gql } from '@apollo/client';

export default gql`
  fragment CheckInQuestion on CheckInQuestion {
    answer {
      answer
      updatedAt
      id
      grade {
        status
        createdAt
        updatedAt
        lastGradedBy {
          firstName
          lastName
        }
      }
    }
    id
    question
    step
    teamSubmission {
      id
      grade {
        status
        createdAt
        updatedAt
        lastGradedBy {
          firstName
          lastName
        }
      }
      answers {
        answer
        id
        student {
          uuid
          firstName
          lastName
        }
        updatedAt
      }
      canSubmit
    }
  }
`;
