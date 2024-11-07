import { useTranslation } from 'react-i18next';

import { ReactComponent as TeamIcon } from '@shared/svg/team_icon.svg';

import Icon from '../Icon/Icon';

import styles from './TeamHeader.module.sass';

type Props = {
  teamName: string;
  memberCount: number;
};

export const TeamHeader = ({ teamName, memberCount }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.teamIconWrapper}>
        <Icon className={styles.teamIcon} icon={<TeamIcon />} />
      </div>
      <div>
        <p className={styles.memberCount}>{t('teams.members', { count: memberCount })}</p>
        <h6 className={styles.teamName}>{teamName}</h6>
      </div>
    </div>
  );
};
