import { useTranslation } from 'react-i18next';

import { ReactComponent as EmptyCollege } from '@shared/assets/images/emptyCollege.svg';

import styles from './EmptyInstitutionList.module.sass';

export const EmptyInstitutionList = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyFavourites}>
      <EmptyCollege className={styles.image} />
      <h5 className={styles.heading}>
        {t('student.postSecondary.searchSection.emptyInstitutionHead')}{' '}
      </h5>
      <span className={styles.info}>
        {t('student.postSecondary.searchSection.emptyInstitutionsText')}
      </span>
    </div>
  );
};
