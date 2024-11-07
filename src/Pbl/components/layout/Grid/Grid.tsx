import cx from 'classnames';
import { type PropsWithChildren } from 'react';

import { roleAllowed } from '@pbl/utils/roleAllowed';
import { libraryAllowedRoles } from '@pbl/resources/roleGuard';

import styles from './Grid.module.sass';

type Props = PropsWithChildren<{}> & {
  className?: string;
};

const Grid = ({ children, className }: Props) => {
  const gridClasses = cx(styles.grid, className, {
    [styles.libraryGrid]: roleAllowed(libraryAllowedRoles),
  });

  return <div className={gridClasses}>{children}</div>;
};

export default Grid;
