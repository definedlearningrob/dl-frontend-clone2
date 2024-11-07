import { gql } from '@apollo/client';

export default gql`
  mutation UpdateText($input: UpdateTextMutationInput!) {
    updateText(input: $input) {
      text {
        content
        displayName
        id
        name
      }
    }
  }
`;
