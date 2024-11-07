import { gql } from '@apollo/client';

export default gql`
  query Conversation($id: ID!, $first: Int, $after: String, $with: ConversationParticipantFilter!) {
    conversation(id: $id) {
      id
      conversationContext {
        id
        name
      }
      messages(first: $first, after: $after) {
        edges {
          node {
            author {
              uuid
              name
            }
            body
            createdAt
            id
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
      messagesRead
      recentMessage {
        id
        body
        createdAt
      }
    }
    conversationGroup(with: $with) {
      hasUnreadConversation
      participant {
        uuid
      }
    }
  }
`;

export type TConversationContext = {
  id: string;
  name: string;
};

export type TConversation = {
  id: string;
  conversationContext: TConversationContext;
};
