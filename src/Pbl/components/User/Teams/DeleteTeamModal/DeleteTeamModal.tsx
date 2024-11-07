import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import { TTeam } from '@pbl/graphql/user/fragments/team';
import { useArchiveTeam } from '@pbl/graphql/user/hooks/useArchiveTeam';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  team: TTeam;
  isOpen: boolean;
  handleClose: () => void;
};

export const DeleteTeamModal = ({ team, isOpen, handleClose }: Props) => {
  const { t } = useTranslation();
  const [archiveTeam] = useArchiveTeam(team.uuid);

  const handleDelete = async () => {
    try {
      await archiveTeam();
      callToast('success', t('notifications.success.deleted', { name: t('teams.team') }));
      handleClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('teams.validation.deleteError'));
      }
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={handleClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('common.actions.deleteEntity', { name: team.name })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>{t('teams.deleteTeamConfirmation', { name: team.name })}</SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button variant='danger' onClick={handleDelete}>
          {t('common.actions.delete')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
