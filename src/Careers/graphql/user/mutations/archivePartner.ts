import { gql } from '@apollo/client';

gql`
  mutation ArchivePartner($input: ArchivePartnerMutationInput!) {
    archivePartner(input: $input) {
      partner {
        id
        isArchived
      }
    }
  }
`;
