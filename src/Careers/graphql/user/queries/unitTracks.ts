import { gql } from '@apollo/client';

export default gql`
  query UnitTracks($id: ID!) {
    unit(id: $id) {
      id
      tracks {
        id
        name
      }
      resources {
        description
        imageUrl
        name
        resourceId
        resourceType
        step
        thumbnailUrl
      }
    }
  }
`;
