import { gql } from '@apollo/client';

gql`
  mutation UpdateEntityCatalogs($input: UpdateEntityCatalogsMutationInput!) {
    updateEntityCatalogs(input: $input) {
      entity {
        uuid
        name
      }
    }
  }
`;
