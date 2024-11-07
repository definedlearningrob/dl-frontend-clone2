import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import styles from './CatalogCard.module.sass';

type Props = {
  secondaryCount: number;
  primaryCount: number;
  displayName?: string;
  isActive?: boolean;
  onClick: () => void;
};

const CatalogCardContent = (props: Props) => {
  const { secondaryCount, primaryCount, displayName, isActive, onClick } = props;
  const { t } = useTranslation();
  const cardClasses = cx(styles.dashboardCatalogCard, {
    [styles.active]: isActive,
  });

  return (
    <div className={cardClasses} onClick={onClick}>
      <h6 className={styles.title} data-testid='dashboard-catalog-item-name'>
        {displayName}
      </h6>
      <div className={styles.counter}>
        <div className={styles.info} data-testid='dashboard-catalog-item-courses-info'>
          <strong>{primaryCount} </strong>
          <p className={styles.infoText}>{t('user.dashboard.courses', { count: primaryCount })}</p>
        </div>
        <div className={styles.info} data-testid='dashboard-catalog-item-courses-info'>
          <strong>{secondaryCount} </strong>
          <p className={styles.infoText}>
            {t('user.dashboard.projects', { count: secondaryCount })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatalogCardContent;
