import { gql } from '@apollo/client';

export default gql`
  mutation CreatePresentation($input: CreatePresentationMutationInput!) {
    createPresentation(input: $input) {
      presentation {
        id
        name
      }
    }
  }
`;
