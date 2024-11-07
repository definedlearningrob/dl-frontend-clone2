import { gql } from '@apollo/client';

export default gql`
  mutation SendMessage($input: SendMessageMutationInput!) {
    sendMessage(input: $input) {
      message {
        author {
          uuid
          name
        }
        id
        body
        createdAt
      }
    }
  }
`;

export type SendMessageMutationData = {
  sendMessage: {
    message: {
      author: {
        uuid: string;
        name: string;
      };
      id: string;
      body: string;
      createdAt: string;
    };
  };
};

export type SendMessageMutationVariables = {
  input: {
    conversationId: string;
    body: string;
  };
};
