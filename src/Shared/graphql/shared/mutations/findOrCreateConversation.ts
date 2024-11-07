import { gql } from '@apollo/client';

import {
  CONVERSATION_CONTEXT_TYPES,
  CONVERSATION_PARTICIPANT_TYPES,
  CONVERSATION_TYPES,
} from '@shared/resources/enums';

export default gql`
  mutation FindOrCreateConversation($input: FindOrCreateConversationMutationInput!) {
    findOrCreateConversation(input: $input) {
      conversation {
        id
      }
    }
  }
`;

export type FindOrCreateConversationMutationData = {
  findOrCreateConversation: {
    conversation: {
      id: string;
    };
  };
};
export type FindOrCreateConversationMutationVariables = {
  input: {
    contextId: string;
    contextType: CONVERSATION_CONTEXT_TYPES;
    receiverType: CONVERSATION_PARTICIPANT_TYPES;
    receiverUuid: string;
    type: CONVERSATION_TYPES;
  };
};
