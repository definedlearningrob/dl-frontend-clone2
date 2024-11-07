import { gql } from '@apollo/client';

export default gql`
  mutation CreateText($input: CreateTextMutationInput!) {
    createText(input: $input) {
      text {
        content
        displayName
        id
        name
      }
    }
  }
`;
