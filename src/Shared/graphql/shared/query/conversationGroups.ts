import { gql } from '@apollo/client';

export default gql`
  query ConversationGroups($first: Int, $after: String) {
    conversationGroups(first: $first, after: $after) {
      edges {
        node {
          hasUnreadConversation
          participant {
            uuid
            name
            members {
              uuid
              name
            }
            owner {
              uuid
              name
            }
          }
          recentConversation {
            id
            recentMessage {
              id
              body
              createdAt
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

export type TConversationGroupsData = {
  conversationGroups: {
    edges: TConversationGroup[];
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
    };
  };
};

export type TConversationGroup = {
  node: {
    hasUnreadConversation: boolean;
    participant: TConversationParticipant;
    recentConversation: {
      id: string;
      recentMessage: {
        id: string;
        body: string;
        createdAt: string;
      };
    };
  };
};

export type TConversationParticipant = {
  uuid: string;
  name: string;
  __typename: string;
  members: {
    uuid: string;
    firstName: string;
    lastName: string;
    owner: {
      uuid: string;
      name: string;
    };
  };
};
