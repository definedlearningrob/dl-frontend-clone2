import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ApplicationStatus, OpportunityTypes } from '@graphql/dc/shared/types';

import { useAddOpportunityToFavorites } from '@dc/graphql/student/hooks/useAddOpportunityToFavorites';
import { useRemoveOpportunityFromFavorites } from '@dc/graphql/student/hooks/useRemoveOpportunitiesFromFavorites';
import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';
import { applicationViewStatusesKeyMap } from '@dc/components/Opportunities/OpportunityCard/helpers';
import { getOpportunityBadgeType } from '@dc/components/Opportunities/helpers';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { InterestedButton } from '@shared/components/InterestedButton/InterestedButton';
import { getIsExpired } from '@shared/utils/date';
import { Badge } from '@shared/components/Badge/Badge';

export const OpportunityHeader = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [addOpportunityToFavorites] = useAddOpportunityToFavorites();
  const [removeOpportunityFromFavorites] = useRemoveOpportunityFromFavorites();
  const { data } = useOpportunityQuery({ id });

  if (!data) return null;

  const opportunity = data.opportunity;
  const isVirtualInternship = opportunity.opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP;
  const isExpired =
    getIsExpired(opportunity.periodEnd) &&
    opportunity.applicationStatus === ApplicationStatus.PENDING;
  const status = isExpired ? 'EXPIRED' : opportunity.applicationStatus;
  const virtualInternshipStatus = opportunity.virtualInternship?.status;
  const virtualInternshipStatusKey =
    virtualInternshipStatus && applicationViewStatusesKeyMap[virtualInternshipStatus];

  const statusBadgeText = isVirtualInternship
    ? t(`opportunities.virtualInternshipStatus.${virtualInternshipStatusKey}`)
    : t(`opportunityDetails.statuses.${status}`);

  const statusToPass = isVirtualInternship ? ApplicationStatus.ACCEPTED : status;
  const badgeType = getOpportunityBadgeType(statusToPass, opportunity.virtualInternship?.status);

  const size = isFullHD ? 'md' : 'sm';

  const toggleFavorite = () => {
    opportunity.isFavorite
      ? removeOpportunityFromFavorites({ id })
      : addOpportunityToFavorites({ id });
  };

  return (
    <>
      {opportunity.applicationStatus && (
        <Badge size={isFullHD ? 'base' : 'small'} type={badgeType}>
          {statusBadgeText}
        </Badge>
      )}
      <div className='ms-auto'>
        <InterestedButton
          isSelected={opportunity?.isFavorite}
          size={size}
          withLabel={true}
          onClick={toggleFavorite}
        />
      </div>
    </>
  );
};
