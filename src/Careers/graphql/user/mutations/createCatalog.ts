import { gql } from '@apollo/client';

export default gql`
  mutation CreateCatalog($input: CreateCatalogMutationInput!) {
    createCatalog(input: $input) {
      catalog {
        description
        displayName
        id
        imageUrl
        name
      }
    }
  }
`;
