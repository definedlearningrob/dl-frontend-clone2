import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useArchiveOpportunity } from '@dc/graphql/user/hooks/useArchiveOpportunity';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';
import { removeFromCache } from '@shared/utils/graphql';

type Props = {
  handleClose: () => void;
  opportunityName: string;
  opportunityId: string;
};

export const ArchiveOpportunityModal = ({ opportunityName, opportunityId, handleClose }: Props) => {
  const { t } = useTranslation();
  const [archiveOpportunity] = useArchiveOpportunity();
  const history = useHistory();
  const handleArchiveOpportunity = async (id: string) => {
    try {
      await archiveOpportunity({
        variables: { input: { id } },
        update: removeFromCache({ id, __typename: 'Opportunity' }),
      });
      callToast('success', t('user.opportunities.form.archiveSuccess'));
      history.push('/opportunities');
    } catch (error) {
      callToast('error', t('user.opportunities.form.archiveFailed'));
    }
    handleClose();
  };

  return (
    <SharedModal isOpen={true} onDismiss={handleClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('common.actions.archiveEntity', { name: opportunityName })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        {t('user.opportunities.archiveOpportunityConfirmation', { name: opportunityName })}
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          variant='danger'
          onClick={() => handleArchiveOpportunity(opportunityId)}>
          {t('common.actions.archive')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
