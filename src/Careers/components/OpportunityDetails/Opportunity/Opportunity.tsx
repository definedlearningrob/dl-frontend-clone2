import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useToggle } from 'react-use';
import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';
import { OpportunityApplication } from '@dc/components/Opportunities/OpportunityApplicationModal';
import { OpportunityAction } from '@dc/components/OpportunityDetails/Opportunity/OpportunityAction';
import { DELETE_OPPORTUNITY_APPLICATION } from '@dc/graphql/student/mutations/deleteOpportunityApplication';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

import { removeFromCache } from '@shared/utils/graphql';
import { callToast } from '@shared/components/Toaster/Toaster';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';

import { OpportunitySummaryCard } from '../OpportunitySummaryCard';

import { OpportunityHeader } from './OpportunityHeader';
import { OpportunitySkeleton } from './OpportunitySkeleton';

export const Opportunity = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const [isRemoveModalOpen, toggleIsRemoveModalOpen] = useToggle(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { data, loading } = useOpportunityQuery({
    id,
  });
  const [mutate] = useMutation(DELETE_OPPORTUNITY_APPLICATION);

  if (!data) {
    return null;
  }

  if (loading) {
    return <OpportunitySkeleton />;
  }

  const { opportunity } = data;

  const handleModalOpen = (isPreviewMode: boolean) => {
    setIsPreviewMode(isPreviewMode);
    toggleIsModalOpen(true);
  };

  const handleRemoveApplication = async () => {
    try {
      await mutate({
        variables: {
          input: {
            opportunityApplicationId: opportunity.opportunityApplication.id,
          },
        },
        refetchQueries: [{ query: MY_OPPORTUNITIES }],
        update: removeFromCache({
          id: opportunity.opportunityApplication.id,
          __typename: 'OpportunityApplication',
        }),
      });
      callToast('info', t('opportunities.removeApplicationSuccess'));
    } catch (error) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      }
    }

    toggleIsRemoveModalOpen();
  };

  return (
    <>
      <OpportunitySummaryCard
        actions={
          <OpportunityAction
            opportunity={opportunity}
            onApply={handleModalOpen}
            onRemove={toggleIsRemoveModalOpen}
          />
        }
        header={<OpportunityHeader />}
        opportunity={opportunity}
      />
      <OpportunityApplication
        id={id}
        isReadOnly={isPreviewMode}
        showModal={isModalOpen}
        onClose={() => toggleIsModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={toggleIsRemoveModalOpen}
        onConfirm={handleRemoveApplication}>
        {t('opportunities.removeApplicationText')}
      </ConfirmationModal>
    </>
  );
};
