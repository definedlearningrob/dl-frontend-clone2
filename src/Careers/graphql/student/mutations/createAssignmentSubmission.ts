import { gql } from '@apollo/client';

export default gql`
  mutation CreateAssignmentSubmission($input: CreateAssignmentSubmissionMutationInput!) {
    createAssignmentSubmission(input: $input) {
      assignmentSubmission {
        id
      }
    }
  }
`;
