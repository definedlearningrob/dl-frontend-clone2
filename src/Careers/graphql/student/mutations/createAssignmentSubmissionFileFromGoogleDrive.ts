import { gql } from '@apollo/client';

export default gql`
  mutation CreateAssignmentSubmissionFileFromGoogleDrive(
    $input: CreateAssignmentSubmissionFileFromGoogleDriveMutationInput!
  ) {
    createAssignmentSubmissionFileFromGoogleDrive(input: $input) {
      assignmentSubmissionFile {
        filename
        googleWeblink
        id
        source
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;
