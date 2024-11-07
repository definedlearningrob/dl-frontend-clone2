import { gql } from '@apollo/client';

gql`
  query DlTrack($id: ID!) {
    track(id: $id) {
      description
      name
      displayName
      grades
      id
      imageUrl
      thumbnailUrl
      tasksCount
      units {
        description
        displayName
        id
        imageUrl
        thumbnailUrl
        tasks {
          description
          displayName
          id
          imageUrl
          thumbnailUrl
        }
      }
    }
  }
`;
