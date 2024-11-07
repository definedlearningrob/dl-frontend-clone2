import { gql } from '@apollo/client';

gql`
  query CustomCatalogOverview {
    careersCatalog {
      id
      description
      name
      thumbnailUrl
      imageUrl
    }
  }
`;
