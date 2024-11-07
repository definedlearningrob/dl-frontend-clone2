import React, { ReactNode } from 'react';
import cx from 'classnames';

import SharedImage from '@shared/components/Image/Image';

import styles from './EmptyStandard.module.sass';

type Props = {
  children?: ReactNode;
  errorSubtitle: string;
  errorText: string;
  image: string;
  hasElements?: boolean;
};

export const EmptyStandard = ({
  errorSubtitle,
  errorText,
  image,
  children,
  hasElements,
}: Props) => (
  <div className={styles.main}>
    <div className={cx(styles.wrapper, { [styles.draft]: hasElements })}>
      {children}
      <div className={styles.top}>
        <SharedImage className={styles.icon} src={image} />
        <h6 className={styles.heading}>{errorSubtitle}</h6>
        <p className={styles.text}>{errorText}</p>
      </div>
    </div>
  </div>
);
