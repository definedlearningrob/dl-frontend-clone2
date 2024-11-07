import { useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './ParticipantListSkeleton.module.sass';

export const ParticipantListSkeleton = () => {
  const { t } = useTranslation();

  return (
    <SharedCard className={styles.skeletonCard}>
      <h5 className={styles.cardTitle}>{t('user.opportunities.participantList')}</h5>
      <Rectangle className={styles.listHeading} color='darker' radius='sm' size='md' />
      <Rectangle className={styles.listItem} color='darker' height='small' radius='sm' />
      <Rectangle className={styles.listItem} color='darker' height='small' radius='sm' />
      <Rectangle className={styles.listItem} color='darker' height='small' radius='sm' />
    </SharedCard>
  );
};
