import cx from 'classnames';
import { type PropsWithChildren } from 'react';

import styles from './FullPageCard.module.sass';

type Props = PropsWithChildren<{
  size: 'sm' | 'md' | 'lg';
}>;

const FullPageCard = ({ children, size }: Props) => {
  const cardClasses = cx(styles.card, {
    [styles.cardSmall]: size === 'sm',
    [styles.cardMedium]: size === 'md',
    [styles.cardLarge]: size === 'lg',
  });

  return (
    <div className={styles.wrapper}>
      <section className={cardClasses}>{children}</section>
    </div>
  );
};

export default FullPageCard;
