import { ReactComponent as DefaultImage } from '@dc/images/extension_default.svg';

import SharedImage from '@shared/components/Image/Image';
import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './Header.module.sass';

type Props = {
  image: string | undefined;
  owner: {
    firstName: string;
    lastName: string;
  };
  title: string;
  username: string;
};

const ExtensionFieldHeader = ({ image, owner, title, username }: Props) => (
  <header className={styles.header}>
    {image ? <SharedImage className={styles.image} src={image} /> : <DefaultImage />}
    <div className={styles.details}>
      <div className={styles.userHeader}>
        <SharedAvatar size='40' theme='base' user={owner} />
        <span className={styles.username}>{username}</span>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  </header>
);

export default ExtensionFieldHeader;
