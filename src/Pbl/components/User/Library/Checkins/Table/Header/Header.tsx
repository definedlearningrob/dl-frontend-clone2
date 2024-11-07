import { useTranslation } from 'react-i18next';

import Heading from '@shared/components/Heading/Heading';

import styles from './Header.module.sass';

export const UserLibraryCheckinsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <Heading className={styles.heading}>{t('user.library.checkins.main.header')}</Heading>
    </div>
  );
};
