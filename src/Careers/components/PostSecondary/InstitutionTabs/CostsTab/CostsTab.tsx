import { useTranslation } from 'react-i18next';

import { InstitutionCard } from '../../InstitutionCard';

import styles from './CostsTab.module.sass';

export const CostsTab = () => {
  const { t } = useTranslation();

  return (
    <InstitutionCard
      description='Marquette University costs $34,120 after scholarships and grants, with 59% of students
    receiving financial aid and an average aid package of $36,565.'
      title={t('postSecondary.institution.costs')}>
      <section className={styles.cardSection}>
        <h4 className={styles.heading}>Tuition</h4>
        <div className={styles.listItem}>
          <div>
            <h5 className={styles.listItemHeading}>Average Net Price</h5>
            <p className={styles.additionalInfo}>
              Net price is the cost of tuition and fees minus scholarships and grants. It’s the best
              figure to use when comparing the costs of colleges. Net price varies by household
              income. Use the college’s Net Price calculator for the most accurate estimate of your
              net price.
            </p>
          </div>
          <span className={styles.listItemValue}>$34,120 per year</span>
        </div>
      </section>
    </InstitutionCard>
  );
};
