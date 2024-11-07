import { gql } from '@apollo/client';

export default gql`
  query Vocabulary($id: ID!) {
    vocabulary(id: $id) {
      archivedAt
      definition
      id
      term
    }
  }
`;
