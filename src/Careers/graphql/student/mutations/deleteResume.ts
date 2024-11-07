import { gql } from '@apollo/client';

export default gql`
  mutation DeleteResume($input: DeleteResumeMutationInput!) {
    deleteResume(input: $input) {
      status
    }
  }
`;
