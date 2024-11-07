import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './StepWrapper.module.sass';

type Props = {
  children: ReactNode;
  title?: string;
  isError: boolean;
};

const StepWrapper = ({ children, title, isError }: Props) => {
  const mainContent = cx(styles.main, {
    [styles.error]: isError,
  });

  return (
    <div className={mainContent}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default StepWrapper;
