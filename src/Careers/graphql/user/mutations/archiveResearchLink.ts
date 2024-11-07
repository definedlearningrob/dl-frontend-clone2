import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveResearchLink($input: ArchiveResearchLinkMutationInput!) {
    archiveResearchLink(input: $input) {
      researchLink {
        archivedAt
        id
      }
    }
  }
`;
