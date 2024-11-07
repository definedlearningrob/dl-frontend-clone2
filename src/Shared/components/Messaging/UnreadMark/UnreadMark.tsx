import cx from 'classnames';

import styles from './UnreadMark.module.sass';

type Props = {
  visible?: boolean;
};

function UnreadMark(props: Props) {
  const { visible } = props;
  const className = cx('unreadMark', styles.unreadMark, { [styles.visible]: visible });

  return <div className={className} />;
}

export default UnreadMark;
