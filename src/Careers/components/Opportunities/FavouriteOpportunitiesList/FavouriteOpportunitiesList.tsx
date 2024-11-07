import { Trans, useTranslation } from 'react-i18next';
import { useMyOpportunitiesQuery } from '@graphql/dc/students/hooks';
import { isEmpty } from 'lodash-es';

import { ReactComponent as EmptyState } from '@dc/assets/images/emptyMyOpportunities.svg';
import { OpportunitiesListWrapper } from '@dc/components/Opportunities/OpportunitiesListWrapper/OpportunitiesListWrapper';

import Card from '@shared/components/Card/Card';

import { OpportunityCard } from '../OpportunityCard';

export const FavouriteOpportunitiesList = () => {
  const { t } = useTranslation();

  const { data, loading } = useMyOpportunitiesQuery({ variables: { perPage: 100, page: 1 } });

  const myOpportunities = data?.myOpportunities.nodes ?? [];

  if (!loading && isEmpty(myOpportunities)) {
    return (
      <Card className='h-full flex flex-col justify-center items-center'>
        <div className='mb-base'>
          <EmptyState />
        </div>
        <h4 className='text-sm mb-xs'>{t('opportunities.interestedAndCurrentEmpty')}</h4>
        <span>{t('opportunities.interestedAndCurrentEmptyDetails')}</span>
      </Card>
    );
  }

  return (
    <OpportunitiesListWrapper
      description={t('opportunities.interestedAndCurrentDescription')}
      loading={loading}
      name={
        <Trans
          components={{ neutralText: <span className='text-neutral-600' /> }}
          i18nKey='opportunities.interestedAndCurrentCount'
          values={{ count: myOpportunities.length }}
        />
      }>
      {!loading &&
        myOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} orientation='horizontal' {...opportunity} />
        ))}
    </OpportunitiesListWrapper>
  );
};
