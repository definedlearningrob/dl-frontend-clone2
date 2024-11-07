import { gql } from '@apollo/client';

export default gql`
  mutation UnassignStudentFromCourse($input: UnassignStudentFromCourseMutationInput!) {
    unassignStudentFromCourse(input: $input) {
      courseId
    }
  }
`;
