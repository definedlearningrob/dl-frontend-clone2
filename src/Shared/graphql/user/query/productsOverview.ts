import { gql } from '@apollo/client';

gql`
  query ProductsOverview($id: ID!) {
    task(id: $id) {
      id
      name
      products {
        id
        name
        displayName
        description
      }
    }
  }
`;
