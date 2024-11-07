import cx from 'classnames';
import { type ReactNode } from 'react';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './EmptyPlaceholder.module.sass';

type Props = {
  className?: string;
  icon: ReactNode;
  text: string;
};

const EmptyPlaceholder = ({ className, icon, text }: Props) => (
  <div className={cx(styles.body, className)}>
    <SharedIcon icon={icon} size='lg' />
    <p className={styles.placeholderText}>{text}</p>
  </div>
);

export default EmptyPlaceholder;
