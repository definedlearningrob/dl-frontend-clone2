import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';

import styles from './LabelWithIcon.module.sass';

type Props = {
  icon?: ReactElement;
  variant?: 'default' | 'dark';
  className?: string;
  children: ReactNode;
};

export const LabelWithIcon = ({ icon, variant = 'default', className, children }: Props) => {
  const labelClassName = cx(styles.label, { [styles.labelDark]: variant === 'dark' });

  const iconClassName = cx(styles.iconWrapper, className);

  return (
    <div className={labelClassName}>
      {icon && <div className={iconClassName}>{icon}</div>}
      {children}
    </div>
  );
};
