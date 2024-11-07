import React, { ReactNode } from 'react';
import cx from 'classnames';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './EntityInfoContentUnit.module.sass';

type Props = {
  label: string;
  value: number | string;
} & (
  | {
      badge: boolean;
      badgeState: boolean;
      icon?: never;
    }
  | {
      icon: ReactNode;
      badge?: never;
      badgeState?: never;
    }
);

export const EntityInfoContentUnit = ({ label, value, icon, badge, badgeState }: Props) => {
  const badgeClassName = cx(styles.infoBadge, {
    [styles.badgeEnabled]: badgeState,
  });

  const valueClassName = cx({ [styles.infoValue]: !badge, [badgeClassName]: badge });

  return (
    <div className={styles.unit}>
      {icon && <SharedIcon className={styles.icon} icon={icon} size='xs' />}
      <span>{label}:</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
};
