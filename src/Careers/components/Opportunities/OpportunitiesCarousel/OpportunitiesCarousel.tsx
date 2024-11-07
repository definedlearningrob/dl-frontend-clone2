import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import cx from 'classnames';

import { OpportunityCard } from '@dc/components/Opportunities/OpportunityCard';
import { ReactComponent as EmptyOpportunitiesState } from '@dc/svg/empty_opportunity_cards_section.svg';
import { useMyOpportunitiesQuery } from '@dc/graphql/student/hooks/useMyOpportunitiesQuery';
import { CarouselSkeleton } from '@dc/components/Opportunities/SkeletonOpportunities';

import SharedCarousel from '@shared/components/Carousel/Carousel';
import EmptyState from '@shared/components/EmptyState/EmptyState';

import styles from './OpportunitiesCarousel.module.sass';

export const OpportunitiesCarousel = () => {
  const { t } = useTranslation();
  const { data, loading } = useMyOpportunitiesQuery();

  if (loading) {
    return (
      <div className={styles.opportunitiesCarousel}>
        <h5 className={styles.cardHeader}>{t('opportunities.carouselHeading')}</h5>
        <p className={styles.subHeading}>{t('opportunities.carouselSubheading')}</p>
        <CarouselSkeleton count={3} />
      </div>
    );
  }

  const myOpportunities = data?.myOpportunities.nodes ?? [];

  if (isEmpty(myOpportunities)) {
    return (
      <div className={cx(styles.opportunitiesCarousel, styles.emptyState)}>
        <EmptyState
          heading={t('opportunities.emptyState.genericHeading', {
            area: t('opportunities.carouselHeading'),
          })}
          icon={<EmptyOpportunitiesState data-testid='empty-state-icon' />}>
          <p>{t('opportunities.emptyState.genericSubheading')}</p>
        </EmptyState>
      </div>
    );
  }

  const parsedData = myOpportunities.map((opportunity) => (
    <OpportunityCard key={opportunity.id} className={styles.opportunityCard} {...opportunity} />
  ));

  return (
    <div className={styles.opportunitiesCarousel}>
      <h5 className={styles.cardHeader}>
        {t('opportunities.carouselHeading')}
        <span className={styles.opportunitiesCounter}> ({myOpportunities.length})</span>
      </h5>
      <p className={styles.subHeading}>{t('opportunities.carouselSubheading')}</p>
      <SharedCarousel data={parsedData} />
    </div>
  );
};
