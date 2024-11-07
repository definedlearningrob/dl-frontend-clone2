import cx from 'classnames';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { parseDate } from '@shared/utils/date/date';
import { useMessaging } from '@shared/hooks/useMessaging';

import styles from './Message.module.sass';

MessagingMainPanelMessagesMessage.propTypes = {
  message: PropTypes.shape({
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uuid: PropTypes.string,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
  }),
};

function MessagingMainPanelMessagesMessage({ message }) {
  const { userInfo } = useMessaging();

  const isAuthor = useMemo(() => userInfo.uuid === message.author.uuid, [userInfo, message]);

  const dateToDisplay = useMemo(() => parseDate(message.createdAt), [message]);

  const messageClasses = useMemo(() =>
    cx(styles.message, {
      [styles.isAuthor]: isAuthor,
    })
  );

  return (
    <div className={messageClasses} data-testid='conversation-message'>
      <div className={styles.messageBodyWrapper}>
        <div className={styles.messageBody}>{message.body}</div>
        <div className={styles.footerDate}>{dateToDisplay}</div>
      </div>
    </div>
  );
}

export default MessagingMainPanelMessagesMessage;
