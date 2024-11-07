import Avatar from '@shared/components/Avatar/Avatar';

import styles from './TeamMemberList.module.sass';

type Props = {
  teamMembers: { firstName: string; lastName: string; uuid: string }[];
};

export const TeamMemberList = ({ teamMembers }: Props) => (
  <div className={styles.listWrapper}>
    {teamMembers.map((teamMember) => (
      <div key={teamMember.uuid} className={styles.singleItem}>
        <div className={styles.avatarWrapper}>
          <Avatar className={styles.avatar} size='24px' theme='light' user={teamMember} />
        </div>
        <span>{`${teamMember.firstName} ${teamMember.lastName}`}</span>
      </div>
    ))}
  </div>
);
