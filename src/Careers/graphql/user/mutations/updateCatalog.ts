import { gql } from '@apollo/client';

export default gql`
  mutation UpdateCatalog($input: UpdateCatalogMutationInput!) {
    updateCatalog(input: $input) {
      catalog {
        description
        displayName
        id
        imageUrl
        name
        status
      }
    }
  }
`;
