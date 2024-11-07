import cx from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './Tag.module.sass';
type Props = PropsWithChildren<{
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'light' | 'neutral';
  onClick?: () => void;
}>;

const Tag = ({ children, className, variant = 'secondary', onClick }: Props) => (
  <span className={cx(styles.tag, styles[variant], className)} onClick={onClick}>
    {children}
  </span>
);

export default Tag;
