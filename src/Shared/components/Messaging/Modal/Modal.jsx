import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import findOrCreateConversationMutation from '@shared/graphql/shared/mutations/findOrCreateConversation';
import { CONVERSATION_TYPES } from '@shared/resources/constants';
import { RECEIVER_TYPES } from '@shared/resources/constants';
import sendMessageMutation from '@shared/graphql/shared/mutations/sendMessage';
import { ReactComponent as ChatIcon } from '@shared/svg/chat_outlined.svg';
import ReceiverSelect from '@shared/components/Messaging/Modal/ReceiverSelect/ReceiverSelect';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedModal from '@shared/components/Modal/Modal';
import { useMessaging } from '@shared/hooks/useMessaging';
import Textarea from '@shared/components/Textarea/Textarea';

import styles from './Modal.module.sass';

MessagingModal.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
  initialReceiver: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    uuid: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
  receiverType: PropTypes.string,
  selectDisabled: PropTypes.bool,
  toggleModal: PropTypes.func,
};

const CONVERSATIONS_LOAD_SIZE = 20;

function MessagingModal({
  context,
  initialReceiver,
  onSuccess,
  receiverType,
  selectDisabled,
  toggleModal,
}) {
  const [message, setMessage] = useState();
  const [receiver, setReceiver] = useState(
    initialReceiver ? { ...initialReceiver, value: initialReceiver.uuid } : null
  );
  const [mutateFindOrCreateConversation, { loading: loadingConv }] = useMutation(
    findOrCreateConversationMutation
  );
  const [mutateSendMessage, { loading: loadingSend }] = useMutation(sendMessageMutation);
  const { t } = useTranslation();
  const { queries, messagingState } = useMessaging();
  const { conversationGroupsQuery, conversationsQuery } = queries;

  const updateMessage = ({ target: { value } }) => setMessage(value);
  const processing = useMemo(() => loadingConv || loadingSend, [loadingSend, loadingConv]);
  const sendDisabled = useMemo(() => !receiver || !message, [receiver, message]);

  const sendMessage = async (conversation, participantType) => {
    await mutateSendMessage({
      variables: {
        input: {
          conversationId: conversation.id,
          body: message,
        },
      },
      refetchQueries: [
        {
          query: conversationGroupsQuery,
          variables: { first: CONVERSATIONS_LOAD_SIZE },
        },
        {
          query: conversationsQuery,
          variables: {
            with: { participantUuid: receiver.uuid, participantType },
          },
        },
      ],
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
      },
      awaitRefetchQueries: true,
    });

    setMessage('');
    setReceiver(null);
  };

  const inferredReceiverType = messagingState.receiverType || receiverType;
  const selectedReceiverType = receiver?.recipientType;
  const isTeamReceiver = inferredReceiverType === RECEIVER_TYPES.TEAM;
  const type = !isEmpty(context) ? CONVERSATION_TYPES.CONTEXTUAL : CONVERSATION_TYPES.GENERAL;

  const findOrCreateConversation = async () => {
    const {
      data: {
        findOrCreateConversation: { conversation },
      },
    } = await mutateFindOrCreateConversation({
      variables: {
        input: {
          receiverType: selectedReceiverType || inferredReceiverType,
          receiverUuid: receiver.uuid,
          type,
          contextId: context?.id,
          contextType: context?.type,
        },
      },
    });
    await sendMessage(conversation, selectedReceiverType || inferredReceiverType);

    onSuccess && onSuccess(conversation, receiver);
    toggleModal();
  };

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('messaging.new.title')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <ReceiverSelect
          disabled={selectDisabled || !!initialReceiver}
          isTeamMessage={isTeamReceiver}
          receiver={receiver}
          setReceiver={setReceiver}
        />
        {!isEmpty(context) && (
          <div className={styles.modalContext}>
            <label className={styles.textareaLabel}>{t('messaging.new.context')}</label>
            <div className={styles.contextInfo}>
              <SharedIcon icon={<ChatIcon />} size='sm' />
              <div className={styles.contextTitles}>
                <span className={styles.contextTitle}>{context.title}</span>
                {context.subtitle && (
                  <span className={styles.contextSubtitle}>{context.subtitle}</span>
                )}
              </div>
            </div>
          </div>
        )}
        <Textarea
          data-testid='new-conversation-text-area'
          id='message-area'
          label={t('messaging.new.message')}
          placeholder={t('messaging.startConversation')}
          rows={8}
          value={message}
          onChange={updateMessage}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton
          className={styles.button}
          data-testid='send-message-button'
          disabled={sendDisabled}
          isLoading={processing}
          variant='primary'
          onClick={findOrCreateConversation}>
          {t('messaging.new.send')}
        </SharedButton>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default MessagingModal;
