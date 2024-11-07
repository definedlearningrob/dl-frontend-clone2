import { gql } from '@apollo/client';

gql`
  mutation CreatePartnerFile($input: CreatePartnerFileMutationInput!) {
    createPartnerFile(input: $input) {
      partnerFile {
        createdAt
        filename
        id
        submitter {
          uuid
          firstName
          lastName
        }
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;
