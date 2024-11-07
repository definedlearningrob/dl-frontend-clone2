import { ReactNode } from 'react';

import styles from './Grid.module.sass';

type Props = {
  children: ReactNode;
};

const StudentDashboardGrid = ({ children }: Props) => (
  <article className={styles.container}>{children}</article>
);

export default StudentDashboardGrid;
