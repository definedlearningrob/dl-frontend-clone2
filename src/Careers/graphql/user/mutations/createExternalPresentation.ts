import { gql } from '@apollo/client';

export default gql`
  mutation CreateExternalPresentation($input: CreateExternalPresentationMutationInput!) {
    createExternalPresentation(input: $input) {
      externalPresentation {
        displayName
        id
        name
        source
      }
    }
  }
`;
