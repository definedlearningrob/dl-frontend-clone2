import cx from 'classnames';
import { useMemo } from 'react';

import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';
import { parseDate } from '@shared/utils/date/date';
import UnreadMark from '@shared/components/Messaging/UnreadMark/UnreadMark';
import { TConversationGroup } from '@shared/graphql/shared/query/conversationGroups';

import styles from './ParticipantItem.module.sass';

type Props = {
  activeParticipantId?: string;
  group: TConversationGroup['node'];
  isTeam: boolean;
  onClick: () => void;
};

function MessagingLeftPanelParticipantItem({
  activeParticipantId,
  group,
  group: { participant, recentConversation },
  onClick,
  isTeam,
}: Props) {
  const isSelected = useMemo(
    () => participant.uuid === activeParticipantId,
    [participant, activeParticipantId]
  );

  const itemClasses = useMemo(
    () =>
      cx(styles.item, {
        [styles.selectedItem]: isSelected,
        [styles.hasNewMessage]: group.hasUnreadConversation,
      }),
    [isSelected, group.hasUnreadConversation]
  );

  const dateToDisplay = parseDate(recentConversation.recentMessage.createdAt);

  return (
    <li className={itemClasses} data-testid='conversation-group' onClick={onClick}>
      <div className={styles.itemHeader}>
        <div className={styles.labelWrapper}>
          <UnreadMark visible={group.hasUnreadConversation} />
          {isTeam && (
            <div className={styles.teamIconWrapper}>
              <TeamIcon />
            </div>
          )}
          <h4 className={styles.itemTitle}>{participant?.name}</h4>
        </div>
        {dateToDisplay && (
          <span className={styles.itemDate} data-testid='group-recent-message-date'>
            {dateToDisplay}
          </span>
        )}
      </div>
      <span className={styles.itemMessage} data-testid='group-recent-message-body'>
        {recentConversation.recentMessage?.body}
      </span>
    </li>
  );
}

export default MessagingLeftPanelParticipantItem;
