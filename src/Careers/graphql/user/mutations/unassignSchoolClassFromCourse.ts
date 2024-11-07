import { gql } from '@apollo/client';

export default gql`
  mutation UnassignSchoolClassFromCourse($input: UnassignSchoolClassFromCourseMutationInput!) {
    unassignSchoolClassFromCourse(input: $input) {
      status
    }
  }
`;
