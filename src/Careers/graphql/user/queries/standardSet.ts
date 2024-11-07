import { gql } from '@apollo/client';

export default gql`
  query StandardSet($id: ID!) {
    standardSet(id: $id) {
      archivedAt
      displayName
      id
      name
      setId
    }
  }
`;
