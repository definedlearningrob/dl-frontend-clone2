import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { removeTags } from '@shared/utils/removeTags';
import Messages from '@shared/components/Messaging/MainPanel/Messages/Messages';
import SharedBackwardButton from '@shared/components/BackwardButton/BackwardButton';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useMessaging } from '@shared/hooks/useMessaging';
import MessageInput from '@shared/components/MessageInput/MessageInput';
import { TeamHeader } from '@shared/components/Messaging/PanelHeader/TeamHeader';

import styles from './MainPanel.module.sass';

MessagingMainPanel.propTypes = {
  activeGroup: PropTypes.shape({
    participant: PropTypes.oneOfType([
      PropTypes.shape({
        __typename: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string,
        uuid: PropTypes.string,
      }),
      PropTypes.shape({
        members: PropTypes.arrayOf(
          PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            uuid: PropTypes.string,
          })
        ),
        name: PropTypes.string,
        owner: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          uuid: PropTypes.string,
        }),
      }),
    ]),
    recentConversation: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  conversation: PropTypes.shape({
    conversationContext: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    messages: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
          }),
          body: PropTypes.string,
        })
      ),
      pageInfo: PropTypes.shape({
        endCursor: PropTypes.string,
      }),
    }),
  }),
  fetchMore: PropTypes.func,
  preview: PropTypes.bool,
  selectConversation: PropTypes.func,
};

function MessagingMainPanel({ activeGroup, conversation, fetchMore, preview, selectConversation }) {
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();
  const { refreshUser, sendMessage, isMessageSending } = useMessaging();

  const { id } = useParams();
  const {
    params: { participantId },
  } = useQueryParams();
  const conversationName =
    conversation.conversationContext?.name && removeTags(conversation.conversationContext?.name);

  const backUrl = useMemo(
    () =>
      preview
        ? `/students/${id}/messages?participantId=${participantId}`
        : `/messages?participantId=${participantId}`,
    [participantId, preview]
  );

  const clearConversation = () => selectConversation(null);

  const handleSendMessage = async (msg) => {
    await sendMessage(conversation.id, msg, {
      update(
        cache,
        {
          data: {
            sendMessage: { message },
          },
        }
      ) {
        cache.modify({
          id: cache.identify(conversation),
          fields: {
            recentMessage() {
              return message;
            },
            messages(currentMessages = {}) {
              return {
                ...currentMessages,
                edges: [{ __typeName: 'MessageEdge', node: message }, ...currentMessages.edges],
              };
            },
          },
        });
        cache.modify({
          id: cache.identify(activeGroup),
          fields: {
            recentConversation() {
              return {
                ...conversation,
                recentMessage: message,
              };
            },
          },
        });
      },
    });

    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => refreshUser(), []);

  const isTeam = activeGroup.participant.__typename === 'Team';

  const backwardButton = (
    <SharedBackwardButton
      iconSize='xs'
      link={backUrl}
      text={t('messaging.backToInbox')}
      onClick={clearConversation}
    />
  );

  return (
    <section className={styles.messagesMainPanel}>
      <div className={styles.headerWrapper}>
        {isTeam && (
          <TeamHeader
            additionalElement={backwardButton}
            members={activeGroup.participant.members}
            teacher={activeGroup.participant.owner}
            teamName={activeGroup.participant.name}
          />
        )}
        {!isTeam && (
          <div>
            <div className={styles.backwardButton}>{backwardButton}</div>
            <h4 className={styles.headerTitle}>{conversationName || t('messaging.general')}</h4>
          </div>
        )}
      </div>
      <div className={styles.messagesWrapper}>
        <Messages
          fetchMore={fetchMore}
          isTeam={isTeam}
          messages={conversation.messages}
          messagesEndRef={messagesEndRef}
          ownerUuid={activeGroup.participant.owner?.uuid}
        />
      </div>
      <div className={styles.inputWrapper}>
        {!preview && <MessageInput loading={isMessageSending} onSend={handleSendMessage} />}
      </div>
    </section>
  );
}

export default MessagingMainPanel;
