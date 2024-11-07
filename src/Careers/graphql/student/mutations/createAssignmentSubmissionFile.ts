import { gql } from '@apollo/client';

export default gql`
  mutation CreateAssignmentSubmissionFile($input: CreateAssignmentSubmissionFileMutationInput!) {
    createAssignmentSubmissionFile(input: $input) {
      assignmentSubmissionFile {
        filename
        id
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;
