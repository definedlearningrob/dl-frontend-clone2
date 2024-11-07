import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { VirtualInternshipsList } from '@dc/components/Admin/VirtualInternships/VirtualInternshipsList';

import SharedCard from '@shared/components/Card/Card';
import Link from '@shared/components/Link';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

import styles from './VirtualInternshipsScreen.module.sass';

export const VirtualInternshipsScreen = () => {
  const { t } = useTranslation();

  useClearCacheOnUnmount('virtualInternships');

  return (
    <SharedMainContent className={styles.container}>
      <SharedCard className={styles.card}>
        <SharedCard.Header className={styles.cardHeader}>
          <h4 className={styles.title}>{t('admin.virtualInternship.header')}</h4>
          <Link size='md' to='/admin/virtual-internships/new' variant='primary'>
            {t('admin.virtualInternship.newVirtualInternship')}
          </Link>
        </SharedCard.Header>
        <VirtualInternshipsList />
      </SharedCard>
    </SharedMainContent>
  );
};
