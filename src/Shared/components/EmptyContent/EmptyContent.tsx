import React, { ReactNode } from 'react';
import cx from 'classnames';

import SharedImage from '@shared/components/Image/Image';

import styles from './EmptyContent.module.sass';

type Props = {
  children?: ReactNode;
  image: string;
  hasElements?: boolean;
};

export const EmptyContent = ({ image, children, hasElements }: Props) => (
  <div className={styles.main}>
    <div className={cx(styles.wrapper, { [styles.draft]: hasElements })}>
      <div className={styles.top}>
        <SharedImage className={styles.icon} src={image} />
        {children}
      </div>
    </div>
  </div>
);
