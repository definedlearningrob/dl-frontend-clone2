import { gql } from '@apollo/client';

gql`
  query CatalogTrack($id: ID!) {
    careersCatalog {
      id
      track(id: $id) {
        id
        name
        description
        grades
        resourcesCount
        imageUrl
        thumbnailUrl
        units {
          id
          name
          description
          imageUrl
          thumbnailUrl
          resources {
            resourceId
            name
            description
            imageUrl
            thumbnailUrl
            resourceType
            isVirtualInternship
            pathways {
              name
            }
          }
        }
      }
    }
  }
`;
