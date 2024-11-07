import { gql } from '@apollo/client';

gql`
  mutation RestorePartner($input: RestorePartnerMutationInput!) {
    restorePartner(input: $input) {
      partner {
        id
        isArchived
      }
    }
  }
`;
