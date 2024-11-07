import { useParams } from 'react-router-dom';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { OpportunitySummaryCard } from '@dc/components/OpportunityDetails/OpportunitySummaryCard';
import { useOpportunityQuery } from '@dc/graphql/user/hooks/useOpportunityQuery';
import { ArchiveOpportunityModal } from '@dc/components/User/Opportunities/OpportunitiesList/ArchiveOpportunityModal';

import { useToggle } from '@shared/hooks/useToggle';

import { OpportunityDetailsActions } from './OpportunityDetailsActions';
import { OpportunityDetailsHeader } from './OpportunityDetailsHeader';
import { Skeleton } from './Skeleton';

export const OpportunityDetailsCard = () => {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useOpportunityQuery({ id });

  if (loading || !data) {
    return <Skeleton />;
  }

  const {
    opportunity: {
      visibilityScope,
      opportunityType,
      name,
      id: opportunityId,
      virtualInternship,
      hasPendingApplications,
    },
  } = data;
  const isVirtualInternship = opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP;

  return (
    <>
      <OpportunitySummaryCard
        actions={<OpportunityDetailsActions virtualInternshipId={virtualInternship?.id} />}
        header={
          !isVirtualInternship && (
            <OpportunityDetailsHeader
              callArchiveModal={toggleIsModalOpen}
              hasPendingApplications={hasPendingApplications}
              visibilityScope={visibilityScope}
            />
          )
        }
        opportunity={data.opportunity}
      />
      {isModalOpen && (
        <ArchiveOpportunityModal
          handleClose={toggleIsModalOpen}
          opportunityId={opportunityId}
          opportunityName={name}
        />
      )}
    </>
  );
};
