import { gql } from '@apollo/client';

export default gql`
  mutation AssignSchoolClassToCourse($input: AssignSchoolClassToCourseMutationInput!) {
    assignSchoolClassToCourse(input: $input) {
      status
    }
  }
`;
