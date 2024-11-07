import cx from 'classnames';
import { ReactNode } from 'react';

import styles from './Kicker.module.sass';

export type KickerVariant = 'default' | 'dark' | 'neutral' | 'secondary';

type Props = {
  className?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: KickerVariant;
};

export const Kicker = ({ children, className, size = 'md', variant = 'default' }: Props) => (
  <div className={cx(styles.kicker, styles[size], styles[variant], className)}>{children}</div>
);
