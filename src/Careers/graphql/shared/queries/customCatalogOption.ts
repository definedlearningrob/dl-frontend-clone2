import { gql } from '@apollo/client';

gql`
  query CustomCatalogOption {
    careersCatalog {
      id
      name
      displayName
    }
  }
`;
