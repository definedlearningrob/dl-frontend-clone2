import { gql } from '@apollo/client';

gql`
  mutation DeletePartnerFile($input: DeletePartnerFileMutationInput!) {
    deletePartnerFile(input: $input) {
      partnerFile {
        id
      }
    }
  }
`;
