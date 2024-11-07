import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';

import styles from './FormError.module.sass';

export const FormError = () => {
  const { t } = useTranslation();

  return (
    <SharedMainContent className={styles.errorWrapper}>
      <div className={styles.error}>
        <h3>{t('user.postSecondary.commonAppForms.error.loadingError')}</h3>
        <p>{t('user.postSecondary.commonAppForms.error.tryAgainLater')}</p>
      </div>
    </SharedMainContent>
  );
};
