import cx from 'classnames';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { ReactComponent as MessagesIcon } from '@shared/svg/messages.svg';
import { ReactComponent as ClockIcon } from '@shared/svg/clock.svg';
import { LabelWithIcon } from '@shared/components/LabelWithIcon';
import { formatDateTime, parseDate } from '@shared/utils/date/date';
import { Tooltip } from '@shared/components/Tooltip';

import { SubmissionContent } from '../helpers/types';

import styles from './Submission.module.sass';

type Props = {
  className?: string;
  content: SubmissionContent;
  fullWidth?: boolean;
  hideIndicator?: boolean;
  hideAvatar?: boolean;
  variant?: 'default' | 'light';
  isCurrentUserItem: boolean;
};

export const Submission = ({
  content,
  fullWidth,
  hideIndicator,
  className,
  isCurrentUserItem,
  hideAvatar,
  variant = 'default',
}: Props) => {
  const contentClassName = cx(styles.content, className, {
    [styles.currentUserContent]: isCurrentUserItem,
    [styles.lightContent]: variant === 'light',
  });
  const contentWrapperClassName = cx(styles.contentWrapper, {
    [styles.fullWidth]: fullWidth,
    [styles.currentUserWrapper]: isCurrentUserItem,
  });
  const avatarClassName = cx(styles.userAvatar, { [styles.currentUserAvatar]: isCurrentUserItem });
  const indicatorClassName = cx(styles.indicator, {
    [styles.currentUserIndicator]: isCurrentUserItem,
  });

  return (
    <div className={styles.submission}>
      {!hideAvatar && (
        <div className={styles.userInfo}>
          <SharedAvatar
            className={avatarClassName}
            label={content.author.name}
            size='32'
            theme={isCurrentUserItem ? 'primary' : 'base'}
          />
          {!hideIndicator && <div className={indicatorClassName} />}
        </div>
      )}
      <div className={contentWrapperClassName}>
        <div className={contentClassName}>{content.content}</div>
        <div className={styles.labelsWrapper}>
          <LabelWithIcon icon={<MessagesIcon />} variant='dark'>
            {content.author.name}
          </LabelWithIcon>
          <LabelWithIcon icon={<ClockIcon />}>
            <Tooltip message={formatDateTime(content.date, { withTime: true })}>
              {parseDate(content.date)}
            </Tooltip>
          </LabelWithIcon>
        </div>
      </div>
    </div>
  );
};
