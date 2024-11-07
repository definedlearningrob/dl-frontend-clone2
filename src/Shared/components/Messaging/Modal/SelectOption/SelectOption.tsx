import { ReactComponent as TeamIcon } from '@shared/svg/projectTeam.svg';

import styles from './SelectOption.module.sass';

type Props = {
  data: {
    name: string;
    recipientType: string;
    entity: {
      name: string;
    };
  };
};

const SelectOption = ({ data }: Props) => (
  <div className={styles.itemWrapper} data-testid='option'>
    {data.recipientType === 'TEAM' && (
      <div className={styles.teamIconWrapper}>
        <TeamIcon />
      </div>
    )}
    <span>{data.name}</span>
    {data.entity && <span className={styles.entity}>{data.entity.name}</span>}
  </div>
);

export default SelectOption;
