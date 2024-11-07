import { gql } from '@apollo/client';

export default gql`
  mutation AssignStudentToCourse($input: AssignStudentToCourseMutationInput!) {
    assignStudentToCourse(input: $input) {
      course {
        id
        imageUrl
        name
        progress {
          submitted
          total
        }
        status
        pathway {
          name
        }
      }
    }
  }
`;
