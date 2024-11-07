import cx from 'classnames';

import styles from './Divider.module.sass';

type Props = {
  className?: string;
};

const Divider = ({ className }: Props) => {
  const dividerClassNames = cx(styles.divider, className);

  return <div className={dividerClassNames} />;
};

export default Divider;
