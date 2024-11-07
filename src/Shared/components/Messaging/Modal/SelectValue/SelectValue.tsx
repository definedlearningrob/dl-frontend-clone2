import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';

import styles from './SelectValue.module.sass';

type Props = {
  data: { name: string; recipientType: string };
};

const SelectedValue = ({ data: { name, recipientType } }: Props) => (
  <div className={styles.itemWrapper}>
    {recipientType === 'TEAM' && (
      <div className={styles.teamIconWrapper}>
        <TeamIcon />
      </div>
    )}
    <span data-testid='selected-option'>{name}</span>
  </div>
);

export default SelectedValue;
