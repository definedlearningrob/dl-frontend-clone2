import { castArray } from 'lodash-es';
import { ReactNode } from 'react';
import cx from 'classnames';

import SharedIcon from '../Icon/Icon';

import styles from './InfoBox.module.sass';

type Props = {
  icon: ReactNode;
  title: string | string[] | ReactNode;
  children: ReactNode;
  className?: string;
};

export const InfoBox = ({ icon: Icon, title, className, children }: Props) => (
  <div className={cx(styles.container, className)}>
    <div className={styles.iconWrapper}>
      <SharedIcon className={styles.icon} icon={Icon} />
    </div>
    <h6 className={styles.title}>
      {castArray(title).map((titleItem, index) => (
        <span key={`title${index}`} className={styles.titleItem}>
          {titleItem}
        </span>
      ))}
    </h6>
    <div className={styles.content}>{children}</div>
  </div>
);
