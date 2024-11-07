import { useTranslation } from 'react-i18next';

import EmptyState from '@shared/components/EmptyState/EmptyState';

import styles from './RelatedOpportunities.module.sass';

export const RelatedOpportunities = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.relatedOpportunities}>
      <EmptyState heading={t('opportunityDetails.sideSection.related.emptyState.heading')}>
        <p>{t('opportunityDetails.sideSection.related.emptyState.subheading')}</p>
      </EmptyState>
    </div>
  );
};
