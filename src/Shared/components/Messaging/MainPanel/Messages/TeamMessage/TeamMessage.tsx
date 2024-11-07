import cx from 'classnames';
import { useMemo } from 'react';

import { parseDate } from '@shared/utils/date/date';
import { useMessaging } from '@shared/hooks/useMessaging';
import Avatar from '@shared/components/Avatar/Avatar';
import { LabelWithIcon } from '@shared/components/LabelWithIcon';
import { ReactComponent as MessagesIcon } from '@shared/svg/messages.svg';
import { Roles } from '@shared/resources/enums';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './TeamMessage.module.sass';

type Author = {
  __typename: string;
  name: string;
  uuid: string;
};

type Message = {
  author: Author;
  body: string;
  createdAt: string;
  id: string;
};

type Props = {
  message: Message;
  ownerUuid: string;
};

export const TeamMessage = ({ message, ownerUuid }: Props) => {
  const { userInfo } = useMessaging();

  const isAuthor = useMemo(() => userInfo.uuid === message.author.uuid, [userInfo, message]);
  const isTeammate = useMemo(
    () =>
      !isAuthor &&
      'role' in userInfo &&
      ownerUuid !== message.author.uuid &&
      userInfo.role !== Roles.TEACHER,
    [userInfo, message]
  );

  const dateToDisplay = useMemo(() => parseDate(message.createdAt), [message]);

  const messageClasses = useMemo(
    () =>
      cx(styles.message, {
        [styles.isAuthor]: isAuthor,
        [styles.alignRight]: isAuthor || isTeammate,
      }),
    [isAuthor, isTeammate]
  );

  const isDesktop = useBreakpointUp({ breakpoint: 'xxl' });

  return (
    <div className={messageClasses} data-testid='conversation-message'>
      <div className={styles.messageWrapper}>
        <Avatar label={message.author.name} size={isDesktop ? '32' : '24'} />
        <div>
          <div className={styles.messageContentWrapper}>
            <div className={styles.messageBody}>{message.body}</div>
          </div>
          <div className={styles.footerDate}>
            <LabelWithIcon icon={<MessagesIcon />} variant='dark'>
              {message.author.name}
            </LabelWithIcon>
            <LabelWithIcon>{dateToDisplay}</LabelWithIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
