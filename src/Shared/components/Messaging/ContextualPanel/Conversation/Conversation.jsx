import PropTypes from 'prop-types';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { removeTags } from '@shared/utils/removeTags';
import { parseDate } from '@shared/utils/date/date';
import UnreadMark from '@shared/components/Messaging/UnreadMark/UnreadMark';

import styles from './Conversation.module.sass';

MessagingContextualPanelConversation.propTypes = {
  activeConversationId: PropTypes.string,
  conversation: PropTypes.shape({
    conversationContext: PropTypes.shape({
      __typename: PropTypes.string,
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    messagesRead: PropTypes.bool,
    recentMessage: PropTypes.shape({
      body: PropTypes.string,
      createdAt: PropTypes.string,
    }),
    serviceName: PropTypes.string,
  }),
  group: PropTypes.shape({
    participant: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uuid: PropTypes.string,
    }),
  }),
  preview: PropTypes.bool,
  selectConversation: PropTypes.func,
};

const serviceNameMap = {
  PBL: 'Learning',
  Careers: 'Careers',
};

const contextKeyMap = {
  Task: 'task',
  TeamCheckInSubmission: 'teamCheckInSubmission',
  ProductSubmission: 'productSubmission',
  CheckInQuestionAnswer: 'checkInQuestionAnswer',
  Lesson: 'lesson',
  Assignment: 'assignment',
  Opportunity: 'opportunity',
};

function MessagingContextualPanelConversation({ conversation, preview, selectConversation }) {
  const { t } = useTranslation();

  const conversationName =
    conversation.conversationContext?.name && removeTags(conversation.conversationContext?.name);

  const dateToDisplay = parseDate(conversation.recentMessage.createdAt);

  const isUnread = !preview && !conversation.messagesRead;
  const conversationType = serviceNameMap[conversation.serviceName];
  const conversationTypeClassName = cx(styles.typeLabel, styles[conversation.serviceName]);
  const contextLabel = contextKeyMap[conversation.conversationContext?.__typename];

  const listItemClassname = cx(styles.listItem, { [styles.hasNewMessage]: isUnread });

  return (
    <li
      className={listItemClassname}
      data-testid='conversation-context'
      onClick={selectConversation}>
      <div className={styles.itemContent}>
        <div className={styles.listHeaderHeader}>
          <UnreadMark visible={isUnread} />
          <h4 className={styles.listItemTitle}>{conversationName || t('messaging.general')}</h4>
          {dateToDisplay && (
            <span className={styles.listItemDate} data-testid='conversation-recent-message-date'>
              {dateToDisplay}
            </span>
          )}
        </div>
        <span className={styles.listItemMessage} data-testid='conversation-recent-message-body'>
          {conversation.recentMessage?.body}
        </span>
      </div>
      <div className={styles.labelWrapper}>
        {contextLabel && (
          <div className={conversationTypeClassName}>{t(`messaging.context.${contextLabel}`)}</div>
        )}
        {conversationType && <div className={conversationTypeClassName}>{conversationType}</div>}
      </div>
    </li>
  );
}

export default MessagingContextualPanelConversation;
