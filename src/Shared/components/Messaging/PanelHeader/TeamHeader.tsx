import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { TeamAvatars } from '@pbl/components/User/Teams/TeamAvatars/TeamAvatars';

import { ReactComponent as TeamIcon } from '@shared/svg/team_icon.svg';
import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './TeamHeader.module.sass';

type Member = {
  name: string;
  uuid: string;
};

type Props = {
  additionalElement?: ReactNode;
  teamName: string;
  members: Member[];
  teacher: Member;
};
export const TeamHeader = ({ additionalElement, teamName, members, teacher }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.teamHeader}>
      <div className={styles.teamDescriptionWrapper}>
        {additionalElement}
        <div className={styles.teamDescription}>
          <div className={styles.teamIconWrapper}>
            <TeamIcon />
          </div>
          <div className={styles.teamLabel}>
            <div className={styles.teamCount}>
              {t('messaging.teamHeader.teamCount', { count: members.length })}
            </div>
            <div className={styles.teamName}>
              {t('messaging.teamHeader.teamName', { name: teamName })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.teamInfo}>
        <div className={styles.teacherInfo}>
          <SharedAvatar
            className={styles.teacherAvatar}
            label={teacher.name}
            size='40'
            theme='base'
          />
          <div className={styles.teacherLabel}>
            <div className={styles.teacher}>{t('messaging.teamHeader.teacher')}</div>
            <div className={styles.teacherName}>{teacher.name}</div>
          </div>
        </div>
        <div className={styles.teamAvatars}>
          <TeamAvatars avatarCountToShow={6} interactive={true} users={members} />
        </div>
      </div>
    </div>
  );
};
