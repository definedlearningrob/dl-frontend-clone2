import { gql } from '@apollo/client';

export default gql`
  mutation DuplicateCourse($input: DuplicateCourseMutationInput!) {
    duplicateCourse(input: $input) {
      course {
        id
      }
    }
  }
`;
