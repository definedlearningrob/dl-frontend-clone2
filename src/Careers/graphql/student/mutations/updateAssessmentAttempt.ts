import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAssessmentAttempt($input: UpdateAssessmentAttemptMutationInput!) {
    updateAssessmentAttempt(input: $input) {
      status
    }
  }
`;
