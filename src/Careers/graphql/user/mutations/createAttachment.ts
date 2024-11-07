import { gql } from '@apollo/client';

export default gql`
  mutation CreateAttachment($input: CreateAttachmentMutationInput!) {
    createAttachment(input: $input) {
      attachment {
        description
        displayName
        id
        name
      }
    }
  }
`;
