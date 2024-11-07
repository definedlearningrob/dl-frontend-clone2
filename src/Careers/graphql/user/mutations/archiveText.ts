import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveText($input: ArchiveTextMutationInput!) {
    archiveText(input: $input) {
      text {
        archivedAt
        id
      }
    }
  }
`;
