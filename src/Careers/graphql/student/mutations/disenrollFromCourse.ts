import { gql } from '@apollo/client';

export default gql`
  mutation DisenrollFromCourse($input: DisenrollFromCourseMutationInput!) {
    disenrollFromCourse(input: $input) {
      courseId
    }
  }
`;
