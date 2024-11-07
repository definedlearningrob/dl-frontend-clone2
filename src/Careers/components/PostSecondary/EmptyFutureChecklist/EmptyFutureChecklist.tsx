import { Trans, useTranslation } from 'react-i18next';

import { ReactComponent as HeartIcon } from '@shared/svg/heart-outline.svg';
import { ReactComponent as EmptyCollege } from '@shared/assets/images/emptyCollege.svg';

import styles from './EmptyFutureChecklist.module.sass';

export const EmptyFutureChecklist = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyFutureChecklist}>
      <EmptyCollege className={styles.image} />
      <h5 className={styles.heading}>{t('student.postSecondary.futureChecklist.emptyInfo')}</h5>
      <span className={styles.info}>
        <Trans
          components={{ heartIcon: <HeartIcon className={styles.heartIcon} /> }}
          i18nKey='student.postSecondary.futureChecklist.emptyInfoDetails'
        />
      </span>
    </div>
  );
};
