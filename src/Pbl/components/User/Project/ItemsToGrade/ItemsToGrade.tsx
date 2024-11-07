import { useTranslation } from 'react-i18next';

import { Kicker } from '@shared/components/Kicker';
import Tag from '@shared/components/Tag';

import styles from './ItemsToGrade.module.sass';

type Props = {
  checkinsGradingCount: number;
  submissionsGradingCount: number;
};

const ItemsToGrade = ({ checkinsGradingCount, submissionsGradingCount }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Kicker>{t('user.project.grading.heading')}</Kicker>
      <p className={styles.gradingItem}>
        <span>{t('user.project.grading.checkins')}</span>
        <Tag variant={checkinsGradingCount > 0 ? 'secondary' : 'default'}>
          {checkinsGradingCount}
        </Tag>
      </p>
      <p className={styles.gradingItem}>
        <span>{t('user.project.grading.products')}</span>
        <Tag variant={submissionsGradingCount > 0 ? 'secondary' : 'default'}>
          {submissionsGradingCount}
        </Tag>
      </p>
    </div>
  );
};

export default ItemsToGrade;
