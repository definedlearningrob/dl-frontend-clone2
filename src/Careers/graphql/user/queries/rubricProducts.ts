import { gql } from '@apollo/client';

export default gql`
  query RubricProducts($id: ID!) {
    rubric(id: $id) {
      id
      products {
        id
        name
      }
    }
  }
`;
