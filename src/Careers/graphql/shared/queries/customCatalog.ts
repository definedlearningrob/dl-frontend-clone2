import { gql } from '@apollo/client';

gql`
  query CustomCatalog {
    careersCatalog {
      id
      description
      name
      thumbnailUrl
      imageUrl
      tracks {
        id
        name
        shortDescription
        thumbnailUrl
        imageUrl
        grades
        resourcesCount
      }
    }
  }
`;
