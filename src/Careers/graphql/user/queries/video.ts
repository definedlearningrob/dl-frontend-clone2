import { gql } from '@apollo/client';

export default gql`
  query Video($id: ID!) {
    video(id: $id) {
      archivedAt
      description
      displayName
      filename
      id
      name
      url
    }
  }
`;
