import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RECEIVER_TYPES } from '@shared/resources/constants';
import ContextualPanel from '@shared/components/Messaging/ContextualPanel/ContextualPanel';
import MainPanel from '@shared/components/Messaging/MainPanel/MainPanel';
import { LeftPanel } from '@shared/components/Messaging/LeftPanel/LeftPanel';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import useQueryParams from '@shared/hooks/useQueryParams';
import MessagesPlaceholder from '@shared/components/Messaging/MessagesPlaceholder/MessagesPlaceholder';
import { useMessaging } from '@shared/hooks/useMessaging';

import styles from './Messaging.module.sass';

Messaging.propTypes = {
  preview: PropTypes.bool,
};

const CONVERSATION_GROUPS_LOAD_SIZE = 20;
const MESSAGES_LOAD_SIZE = 20;

function Messaging({ preview }) {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const { removeQueryParams, updateQueryParams } = useQueryParams();
  const history = useHistory();
  const { queries } = useMessaging();

  const {
    conversationGroupsQuery,
    conversationQuery,
    conversationsQuery,
    studentConversationGroupsQuery,
    studentConversationQuery,
    studentConversationsQuery,
  } = queries;

  const { id } = useParams();
  const { user } = useSelector(({ session }) => session);
  const client = useApolloClient();
  const { setMessagingState, messagingState } = useMessaging();

  useEffect(() => {
    setMessagingState({
      ...messagingState,
      onSendMessage: onModalSuccess,
      context: null,
      receiver: null,
      receiverType: undefined,
    });

    return () => {
      setMessagingState({ ...messagingState, onSendMessage: null });
    };
  }, []);

  const receiverType = useMemo(() => {
    if (activeGroup?.participant.__typename === 'Team') {
      return RECEIVER_TYPES.TEAM;
    }

    return user.type === 'student' || preview ? RECEIVER_TYPES.USER : RECEIVER_TYPES.STUDENT;
  }, [user, activeGroup]);

  const properConversationGroupsQuery = useMemo(
    () => (preview ? studentConversationGroupsQuery : conversationGroupsQuery),
    [preview]
  );
  const properConversationQuery = useMemo(
    () => (preview ? studentConversationQuery : conversationQuery),
    [preview]
  );
  const properConversationsQuery = useMemo(
    () => (preview ? studentConversationsQuery : conversationsQuery),
    [preview]
  );

  const extractData = useCallback((data) => (preview ? data.student : data), [preview]);

  const toggleModal = () => setMessagingState({ ...messagingState, show: !messagingState.show });

  const selectGroup = (group, initial) => {
    if (!initial) {
      selectConversation(null);
    }

    group
      ? updateQueryParams({ participantId: group?.participant.uuid })
      : removeQueryParams(['participantId']);

    setActiveGroup(group);
  };

  const selectConversation = (conversation) => {
    conversation
      ? updateQueryParams({ conversationId: conversation?.id })
      : removeQueryParams(['conversationId']);

    setActiveConversation(conversation);
  };

  const shouldShowMessenger = useMemo(
    () => activeGroup && activeConversation,
    [activeGroup, activeConversation]
  );
  const shouldShowContextualPanel = useMemo(
    () => activeGroup && !activeConversation,
    [activeGroup, activeConversation]
  );

  const onModalSuccess = (conversation, participant) => {
    selectConversation(conversation);
    history.push(`/messages?participantId=${participant.uuid}&conversationId=${conversation.id}`);
  };

  const onRefresh = () => {
    client.cache.modify({
      fields: {
        conversationGroups({ DELETE }) {
          return DELETE;
        },
        conversations({ DELETE }) {
          return DELETE;
        },
      },
    });

    if (activeConversation) {
      client.cache.modify({
        id: client.cache.identify(activeConversation),
        fields: {
          messages({ DELETE }) {
            return DELETE;
          },
        },
      });
    }
  };

  const commonLoaderOptions = {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  };

  return (
    <section className={styles.messages}>
      <div className={styles.messagesContent}>
        <SharedDataLoader
          options={{
            ...commonLoaderOptions,
            variables: { uuid: id, first: CONVERSATION_GROUPS_LOAD_SIZE },
          }}
          query={properConversationGroupsQuery}>
          {(data, fetchMore) => {
            const {
              conversationGroups: { edges, pageInfo },
            } = extractData(data);

            return (
              <>
                {edges.length ? (
                  <LeftPanel
                    activeParticipantId={activeGroup?.participant.uuid}
                    conversationGroups={edges}
                    fetchMore={fetchMore}
                    pageInfo={pageInfo}
                    preview={preview}
                    previewedStudent={data.student}
                    selectGroup={selectGroup}
                    toggleModal={toggleModal}
                    onRefresh={onRefresh}
                  />
                ) : (
                  <MessagesPlaceholder preview={preview} toggleModal={toggleModal} />
                )}
              </>
            );
          }}
        </SharedDataLoader>
        {shouldShowContextualPanel && (
          <SharedDataLoader
            options={{
              ...commonLoaderOptions,
              variables: {
                uuid: id,
                with: {
                  participantUuid: activeGroup.participant.uuid,
                  participantType: receiverType,
                },
              },
            }}
            query={properConversationsQuery}>
            {(data, fetchMore) => (
              <ContextualPanel
                activeGroup={activeGroup}
                conversations={extractData(data).conversations.edges}
                fetchMore={fetchMore}
                preview={preview}
                receiverType={receiverType}
                selectConversation={selectConversation}
              />
            )}
          </SharedDataLoader>
        )}
        {shouldShowMessenger && (
          <SharedDataLoader
            options={{
              ...commonLoaderOptions,
              variables: {
                uuid: id,
                id: activeConversation.id,
                first: MESSAGES_LOAD_SIZE,
                with: {
                  participantUuid: activeGroup.participant.uuid,
                  participantType: receiverType,
                },
              },
            }}
            query={properConversationQuery}>
            {(data, fetchMore) => (
              <MainPanel
                activeGroup={activeGroup}
                conversation={extractData(data).conversation}
                fetchMore={fetchMore}
                preview={preview}
                receiverType={receiverType}
                selectConversation={selectConversation}
              />
            )}
          </SharedDataLoader>
        )}
      </div>
    </section>
  );
}

export default Messaging;
