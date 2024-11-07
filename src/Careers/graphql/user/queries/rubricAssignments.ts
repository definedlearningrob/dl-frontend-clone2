import { gql } from '@apollo/client';

export default gql`
  query RubricAssignments($id: ID!) {
    rubric(id: $id) {
      id
      assignments {
        id
        name
      }
    }
  }
`;
