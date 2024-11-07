import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SharedTable from '@shared/components/Table/Table';
import SharedCard from '@shared/components/Card/Card';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './LtiSearch.module.sass';
import { LtiSearchList } from './List/List';

export const LtiSearch = () => {
  const { t } = useTranslation();
  const { toggleIsHidden, setBackNavButton } = useNavigation();

  useEffect(() => {
    toggleIsHidden(true);
    setBackNavButton(false);
  }, []);

  return (
    <div className={styles.container}>
      <SharedCard.Title className={styles.heading} size='small'>
        {t('user.ltiSearch.projects')}
      </SharedCard.Title>
      <SharedTable>
        <LtiSearchList />
      </SharedTable>
    </div>
  );
};
