import { gql } from '@apollo/client';

export default gql`
  query Text($id: ID!) {
    text(id: $id) {
      archivedAt
      content
      displayName
      id
      name
    }
  }
`;
