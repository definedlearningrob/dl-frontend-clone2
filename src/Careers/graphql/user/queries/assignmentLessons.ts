import { gql } from '@apollo/client';

export default gql`
  query AssignmentLessons($id: ID!) {
    assignment(id: $id) {
      id
      lessons {
        id
        name
      }
    }
  }
`;
