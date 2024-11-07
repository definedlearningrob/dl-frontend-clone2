import { gql } from '@apollo/client';

export default gql`
  mutation CreateAssessmentAttempt($input: CreateAssessmentAttemptMutationInput!) {
    createAssessmentAttempt(input: $input) {
      id
    }
  }
`;
