import { ForwardedRef, forwardRef } from 'react';
import { Trans } from 'react-i18next';
import { PartnerOverviewQuery as UserPartnerOverViewQuery } from '@graphql/dc/users/operations';
import { PartnerOverviewQuery as StudentPartnerOverViewQuery } from '@graphql/dc/students/operations';
import { isEmpty } from 'lodash-es';

import { useRole } from '@shared/hooks/useRole';

import { OpportunityCard } from '../../Opportunities/OpportunityCard';
import { PartnerCardContentWrapper } from '../PartnerCardContentWrapper';

import { EmptyPartnerOpportunities } from './EmptyPartnerOpportunities';
import { PartnerOpportunitiesSkeleton } from './PartnerOpportunitiesSkeleton';

type Props = {
  opportunities:
    | UserPartnerOverViewQuery['partner']['opportunities']
    | StudentPartnerOverViewQuery['partner']['opportunities']
    | undefined;
  isLoading: boolean;
};

export const PartnerOpportunities = forwardRef(
  ({ opportunities, isLoading }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { isUser } = useRole();
    const isLoaded = !isLoading && !isEmpty(opportunities);
    const opportunitiesCount = opportunities?.length ?? 0;

    return (
      <PartnerCardContentWrapper
        ref={ref}
        header={
          <Trans
            components={{ neutralText: <span className='text-neutral-600' /> }}
            i18nKey={
              opportunitiesCount === 0
                ? 'partners.opportunities'
                : 'partners.opportunitiesWithCount'
            }
            values={{ count: opportunitiesCount }}
          />
        }>
        {isLoading && <PartnerOpportunitiesSkeleton />}
        {!isLoading && isEmpty(opportunities) && <EmptyPartnerOpportunities />}
        {isLoaded && (
          <ul className='px-base py-sm grid grid-cols-3 gap-x-x gap-y-base xxxl:gap-x-base xxxl:gap-y-md'>
            {opportunities?.map((opportunity) => (
              <li aria-label={opportunity.name}>
                <OpportunityCard {...opportunity} viewMode={isUser ? 'user' : 'student'} />
              </li>
            ))}
          </ul>
        )}
      </PartnerCardContentWrapper>
    );
  }
);
