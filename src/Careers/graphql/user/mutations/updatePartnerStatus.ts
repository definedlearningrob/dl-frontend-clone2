import { gql } from '@apollo/client';

gql`
  mutation UpdatePartnerStatus($input: UpdatePartnerMutationInput!) {
    updatePartner(input: $input) {
      partner {
        id
        status
      }
    }
  }
`;
