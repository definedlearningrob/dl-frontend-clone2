import { gql } from '@apollo/client';

export default gql`
  mutation DeleteAssignmentSubmissionFile($input: DeleteAssignmentSubmissionFileMutationInput!) {
    deleteAssignmentSubmissionFile(input: $input) {
      status
    }
  }
`;
