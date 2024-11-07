import { gql } from '@apollo/client';

export default gql`
  mutation GradeSubmission($input: GradeSubmissionMutationInput!) {
    gradeSubmission(input: $input) {
      submissionGrade {
        id
        status
      }
    }
  }
`;
