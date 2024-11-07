import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import InfiniteScroll from 'react-infinite-scroller';
import { NetworkStatus } from '@apollo/client';

import { ReactComponent as EmptyOpportunitiesIcon } from '@dc/svg/empty_opportunity_cards_section.svg';
import { useOpportunitiesQuery } from '@dc/graphql/student/hooks/useOpportunitiesQuery';
import { ListSkeleton } from '@dc/components/Opportunities/SkeletonOpportunities/ListSkeleton';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import SharedCard from '@shared/components/Card/Card';
import EmptyState from '@shared/components/EmptyState/EmptyState';

import { OpportunityCard } from '../OpportunityCard';
import { useOpportunityFilters } from '../OpportunityFilters/useOpportunityFilters';

import styles from './OpportunitiesList.module.sass';

export const OpportunitiesList = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { filterVariables } = useOpportunityFilters();
  const { t } = useTranslation();
  const currentPage = useRef(1);

  const cardsPerPage = isFullHD ? 15 : 12;

  const { data, refetch, fetchMore, loading, networkStatus } = useOpportunitiesQuery({
    perPage: cardsPerPage,
  });

  useUpdateEffect(() => {
    refetch({ filter: filterVariables, page: 1, infiniteScroll: true });
    currentPage.current = 1;
  }, [filterVariables]);

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <ul className={styles.list}>
        <ListSkeleton count={cardsPerPage} />
      </ul>
    );
  }

  if (!data || data.opportunities.nodesCount === 0) {
    return (
      <SharedCard className={styles.emptyStateCard}>
        <EmptyState
          heading={t('opportunities.emptyState.filterHeading')}
          icon={<EmptyOpportunitiesIcon />}>
          {t('opportunities.emptyState.filterSubheading')}
        </EmptyState>
      </SharedCard>
    );
  }

  const handleFetchMore = (nextPage: number) => {
    fetchMore({ variables: { page: nextPage, infiniteScroll: true } });
    currentPage.current = nextPage;
  };

  const {
    opportunities: { nodes: opportunities },
  } = data;

  const hasMorePages = currentPage.current < data?.opportunities.pagesCount;

  return (
    <InfiniteScroll
      className={styles.list}
      element='ul'
      hasMore={hasMorePages}
      initialLoad={false}
      loadMore={handleFetchMore}
      loader={<ListSkeleton key={0} count={cardsPerPage / 3} />}
      pageStart={1}
      threshold={300}
      useWindow={true}>
      {opportunities.map((opportunity) => (
        <li key={opportunity.id} aria-label={opportunity.name}>
          <OpportunityCard
            applicationStatus={opportunity.applicationStatus}
            className='min-w-0'
            deadline={opportunity.deadline}
            id={opportunity.id}
            imageFitToContainer={opportunity.imageFitToContainer}
            imageUrl={opportunity.imageUrl}
            isFavorite={opportunity.isFavorite}
            isRecommended={opportunity.isRecommended}
            name={opportunity.name}
            opportunityType={opportunity.opportunityType}
            partner={opportunity.partner}
            pathways={opportunity.pathways}
            periodEnd={opportunity.periodEnd}
            periodStart={opportunity.periodStart}
            virtualInternship={opportunity.virtualInternship}
          />
        </li>
      ))}
    </InfiniteScroll>
  );
};
