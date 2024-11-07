import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './UserHeader.module.sass';

type User = {
  firstName: string;
  lastName: string;
};

type Props = {
  userName: User;
  name: string;
};

export const UserHeader = ({ userName, name }: Props) => (
  <div className={styles.userHeader}>
    <SharedAvatar className={styles.avatar} size='40' user={userName} />
    <h4 className={styles.title}>{name}</h4>
  </div>
);
