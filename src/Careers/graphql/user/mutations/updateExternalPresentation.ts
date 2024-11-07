import { gql } from '@apollo/client';

export default gql`
  mutation UpdateExternalPresentation($input: UpdateExternalPresentationMutationInput!) {
    updateExternalPresentation(input: $input) {
      externalPresentation {
        displayName
        isExpandable
        id
        name
        source
      }
    }
  }
`;
