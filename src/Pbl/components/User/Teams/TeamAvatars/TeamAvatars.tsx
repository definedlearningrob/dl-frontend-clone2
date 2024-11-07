import { AvatarWrapper } from '@pbl/components/User/Teams/TeamAvatars/AvatarWrapper';

import Avatar from '@shared/components/Avatar/Avatar';
import { Popover } from '@shared/components/Popover/Popover';

import styles from './TeamAvatars.module.sass';

type User = { uuid: string } & (
  | {
      firstName: string;
      lastName: string;
      name?: never;
    }
  | {
      firstName?: never;
      lastName?: never;
      name: string;
    }
);

type Props = {
  users: User[];
  teamId?: string;
  interactive?: boolean;
  avatarCountToShow?: number;
};

const DEFAULT_COUNT_OF_AVATARS_TO_SHOW = 4;

export const TeamAvatars = ({
  users,
  interactive,
  avatarCountToShow = DEFAULT_COUNT_OF_AVATARS_TO_SHOW,
}: Props) => {
  const hasMoreUsersThanShowLimit = users.length > avatarCountToShow;
  const avatarsToDisplay = hasMoreUsersThanShowLimit ? users.slice(0, avatarCountToShow) : users;
  const restAvatars = hasMoreUsersThanShowLimit ? users.slice(avatarCountToShow, users.length) : [];

  const moreUsersLabel = `+ ${(users.length - avatarCountToShow).toString().split('').join(' ')}`;

  const restUserList = (
    <div className={styles.restList}>
      {restAvatars.map((user) => (
        <div className={styles.restListElement}>
          <Avatar size='24' title={false} user={user} />
          <span className={styles.restListUserLabel}>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.group}>
      {avatarsToDisplay.map((user) => {
        const avatarText = user.name || `${user.firstName} ${user.lastName}`;

        return (
          <AvatarWrapper key={user.uuid} interactive={!!interactive}>
            {({ isInteractive, isHover }) => (
              <Popover
                content={avatarText}
                open={isHover}
                side='top'
                sideOffset={13}
                variant='dark'>
                <Avatar
                  label={avatarText}
                  size='32'
                  title={false}
                  {...(isHover && isInteractive && { theme: 'primary' })}
                />
              </Popover>
            )}
          </AvatarWrapper>
        );
      })}
      {hasMoreUsersThanShowLimit && (
        <AvatarWrapper interactive={!!interactive}>
          {({ isInteractive, isHover }) => (
            <Popover
              align='end'
              alignOffset={-5}
              content={restUserList}
              open={isHover}
              variant='dark'>
              <Avatar
                label={moreUsersLabel}
                size='32'
                {...(isHover && isInteractive && { theme: 'primary' })}
              />
            </Popover>
          )}
        </AvatarWrapper>
      )}
    </div>
  );
};
