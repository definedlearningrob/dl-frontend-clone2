import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { DocumentNode } from 'graphql';
import { ApolloError } from '@apollo/client';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { TUserInfo as TDLUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TStudentInfo as TDLStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import { TConversation } from '@shared/graphql/shared/query/conversation';
import useSendMessageMutation, {
  SendMessageFnOptions,
} from '@shared/graphql/hooks/useSendMessageMutation';
import { MessageReceiver, TeamMessageReceiver } from '@shared/components/Messaging/types';
import { RECEIVER_TYPES } from '@shared/resources/constants';
import conversationQuery from '@shared/graphql/shared/query/conversation';
import conversationGroupsQuery from '@shared/graphql/shared/query/conversationGroups';
import conversationsQuery from '@shared/graphql/shared/query/conversations';
import conversationRecipients from '@shared/graphql/shared/query/conversationRecipients';
import studentConversationsQuery from '@shared/graphql/user/query/studentConversations';
import studentConversationQuery from '@shared/graphql/user/query/studentConversation';
import studentConversationGroupsQuery from '@shared/graphql/user/query/studentConversationGroups';
import { callToast } from '@shared/components/Toaster/Toaster';

type MessageContext = {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
};

type MessagingState = {
  context: MessageContext | null;
  receiverType?: RECEIVER_TYPES;
  actionContext?: MessageContext | null;
  show: boolean;
  receiver?: MessageReceiver | TeamMessageReceiver | null;
  onSendMessage: ((conversation: TConversation, participant: MessageReceiver) => void) | null;
};

type MessagingContextType = {
  messagingState: MessagingState;
  sendMessage: (
    conversationId: string,
    msg: string,
    options?: SendMessageFnOptions
  ) => Promise<void>;
  isMessageSending: boolean;
  setMessagingState: (state: MessagingState) => void;
  queries: TMessagingQueries;
  userInfo: TUserInfo | TDLUserInfo | TStudentInfo | TDLStudentInfo;
  refreshUser: () => void;
};

type TMessagingQueries = {
  conversationQuery: DocumentNode;
  conversationsQuery: DocumentNode;
  usersQuery: DocumentNode;
  conversationGroupsQuery: DocumentNode;
  studentConversationGroupsQuery?: DocumentNode;
  studentConversationQuery?: DocumentNode;
  studentConversationsQuery?: DocumentNode;
};

const MessagingContext = createContext<MessagingContextType>({} as MessagingContextType);

type Props = {
  children: ReactNode;
  userInfo: TUserInfo | TDLUserInfo | TStudentInfo | TDLStudentInfo;
  refreshUser: () => void;
};

export function MessagingProvider(props: Props) {
  const [messagingState, setMessagingState] = useState<MessagingState>({
    actionContext: null,
    context: null,
    show: false,
    receiver: null,
    onSendMessage: null,
  });

  const { userInfo, refreshUser } = props;

  const [sendMessage, { loading }] = useSendMessageMutation();

  const handleSendMessage = async (
    conversationId: string,
    msg: string,
    options?: SendMessageFnOptions
  ) => {
    try {
      await sendMessage({
        variables: {
          input: {
            body: msg,
            conversationId,
          },
        },
        ...options,
      });
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);

        return;
      }
      callToast('error', 'Something went wrong');
    }
  };

  return (
    <MessagingContext.Provider
      value={{
        messagingState,
        setMessagingState,
        sendMessage: handleSendMessage,
        isMessageSending: loading,
        queries: {
          conversationQuery,
          conversationsQuery,
          conversationGroupsQuery,
          usersQuery: conversationRecipients,
          studentConversationsQuery,
          studentConversationQuery,
          studentConversationGroupsQuery,
        },
        userInfo,
        refreshUser,
      }}>
      {props.children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const { queries, ...rest } = useContext(MessagingContext);

  const isPreviewPossible =
    queries?.studentConversationsQuery &&
    queries?.studentConversationGroupsQuery &&
    queries?.studentConversationQuery;

  return {
    ...rest,
    queries,
    isPreviewPossible,
  };
}
