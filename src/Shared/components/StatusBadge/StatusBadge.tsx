import cx from 'classnames';
import { ReactNode } from 'react';

import SharedIcon from '@shared/components/Icon/Icon';

import { Kicker } from '../Kicker';

import styles from './StatusBadge.module.sass';

type Props = {
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  iconSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  label: string;
  status?: string;
  statusClassName?: string;
};

function StatusBadge({
  className,
  icon,
  iconClassName,
  iconSize = 'sm',
  label = 'status',
  status,
  statusClassName,
}: Props) {
  const statusClasses = cx(
    styles.badgeValue,
    {
      [styles.badgeDraft]: status === 'draft',
    },
    statusClassName
  );

  return (
    <div className={cx(styles.badgeWrapper, className)}>
      <Kicker className='!mb-0'>{label}</Kicker>
      <div className={statusClasses}>
        {icon && (
          <SharedIcon className={cx(styles.doneIcon, iconClassName)} icon={icon} size={iconSize} />
        )}
        <span>{status?.toLowerCase()}</span>
      </div>
    </div>
  );
}

export default StatusBadge;
