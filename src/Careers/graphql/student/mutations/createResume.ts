import { gql } from '@apollo/client';

export default gql`
  mutation CreateResume($input: CreateResumeMutationInput!) {
    createResume(input: $input) {
      resume {
        filename
        id
        url(options: { responseContentDisposition: "attachment" })
      }
    }
  }
`;
