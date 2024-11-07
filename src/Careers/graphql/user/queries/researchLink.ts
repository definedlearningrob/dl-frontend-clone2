import { gql } from '@apollo/client';

export default gql`
  query ResearchLink($id: ID!) {
    researchLink(id: $id) {
      archivedAt
      author
      displayName
      id
      name
      resourceLink
      sourceName
    }
  }
`;
