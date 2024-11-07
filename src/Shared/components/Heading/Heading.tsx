import cx from 'classnames';
import { type PropsWithChildren } from 'react';

import styles from './Heading.module.sass';

type HeadingProps = PropsWithChildren<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}>;

const Heading = ({ className, children, size = 'md' }: HeadingProps) => {
  const headingClass = cx(
    styles.heading,
    {
      [styles.small]: size === 'sm',
      [styles.medium]: size === 'md',
      [styles.large]: size === 'lg',
    },
    className
  );

  return <h2 className={headingClass}>{children}</h2>;
};

export default Heading;
