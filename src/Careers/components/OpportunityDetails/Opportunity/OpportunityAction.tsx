import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { OpportunityTypes } from '@graphql/dc/shared/types';
import { ApplicationStatus } from '@graphql/dc/students/types';

import { useCreateOpportunityApplication } from '@dc/graphql/student/hooks/useCreateOpportunityApplication';
import { TOpportunity } from '@dc/resources/types';

import SharedButton from '@shared/components/Button/Button';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { getIsExpired } from '@shared/utils/date';

import { OpportunityInfoBox } from '../OpportunityInfoBox/OpportunityInfoBox';

type Props = {
  opportunity: Pick<
    TOpportunity,
    'applicationStatus' | 'automaticAcceptance' | 'opportunityType' | 'deadline' | 'periodEnd'
  >;
  onApply: (isPreviewMode: boolean) => void;
  onRemove: () => void;
};

export const OpportunityAction = ({ opportunity, onApply, onRemove }: Props) => {
  const [applyToOpportunity] = useCreateOpportunityApplication();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const handleApplication = async () => {
    opportunity.automaticAcceptance
      ? await applyToOpportunity({ opportunityId: +id })
      : onApply(false);
  };

  const buttonSize = isFullHD ? 'md' : 'sm';

  if (opportunity.opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP) {
    if (!opportunity.applicationStatus) {
      return (
        <SharedButton size={buttonSize} variant='primary' onClick={handleApplication}>
          {t('opportunityDetails.applicationButton')}
        </SharedButton>
      );
    }

    return (
      <Link size={buttonSize} to={`/opportunities/${id}/virtual-internship`} variant='primary'>
        {t('opportunityDetails.launchInternship')}
      </Link>
    );
  }

  switch (opportunity.applicationStatus) {
    case ApplicationStatus.ACCEPTED:
      return <OpportunityInfoBox status='accepted' />;
    case ApplicationStatus.PENDING:
      if (getIsExpired(opportunity.periodEnd)) {
        return null;
      }

      return (
        <OpportunityInfoBox status='pending' onRemove={onRemove} onView={() => onApply(true)} />
      );
    case ApplicationStatus.FINISHED:
    case ApplicationStatus.REJECTED:
      return (
        <SharedButton size={buttonSize} variant='primary' onClick={handleApplication}>
          {t('opportunityDetails.reapplyApplicationButton')}
        </SharedButton>
      );
    case ApplicationStatus.STARTED:
      return null;
    default:
      if (getIsExpired(opportunity.deadline)) {
        return <OpportunityInfoBox deadline={opportunity.deadline} status='deadline' />;
      }

      if (!opportunity.applicationStatus) {
        return (
          <SharedButton size={buttonSize} variant='primary' onClick={handleApplication}>
            {t('opportunityDetails.applicationButton')}
          </SharedButton>
        );
      }

      return null;
  }
};
