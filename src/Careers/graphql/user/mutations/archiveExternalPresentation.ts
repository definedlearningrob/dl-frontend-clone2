import { gql } from '@apollo/client';

export default gql`
  mutation ArchiveExternalPresentation($input: ArchiveExternalPresentationMutationInput!) {
    archiveExternalPresentation(input: $input) {
      externalPresentation {
        id
        archivedAt
      }
    }
  }
`;
