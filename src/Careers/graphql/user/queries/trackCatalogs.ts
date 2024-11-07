import { gql } from '@apollo/client';

export default gql`
  query TrackCatalogs($id: ID!) {
    track(id: $id) {
      id
      catalogs {
        id
        name
      }
    }
  }
`;
