import cx from 'classnames';
import { PropsWithChildren } from 'react';

import { Kicker } from '@shared/components/Kicker';

import styles from './ItemWrapper.module.sass';

const ItemWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className={styles.wrapper}>{children}</div>
);

ItemWrapper.Header = ({ children }: PropsWithChildren<{}>) => (
  <header className={styles.header}>{children}</header>
);
ItemWrapper.Kicker = ({ children }: PropsWithChildren<{}>) => <Kicker>{children}</Kicker>;

type BodyProps = PropsWithChildren<{
  className?: string;
}>;

ItemWrapper.Body = ({ children, className }: BodyProps) => {
  const bodyClasses = cx(styles.body, className);

  return <div className={bodyClasses}>{children}</div>;
};

export default ItemWrapper;
