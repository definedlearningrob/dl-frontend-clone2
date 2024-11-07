import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAttachment($input: UpdateAttachmentMutationInput!) {
    updateAttachment(input: $input) {
      attachment {
        description
        displayName
        id
        name
      }
    }
  }
`;
