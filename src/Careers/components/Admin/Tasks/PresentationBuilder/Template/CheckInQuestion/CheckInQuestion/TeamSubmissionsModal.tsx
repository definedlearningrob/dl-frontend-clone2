import { useTranslation } from 'react-i18next';

import PresentationModal from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationModal/PresentationModal';

import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

import { CheckInSubmissions } from '@shared/components/CheckIns';

type Props = {
  teamSubmission: TCheckInTeamSubmission | null;
  toggleTeamSubmissionsModal: () => void;
  userUuid: string;
};

export const TeamSubmissionsModal = ({
  teamSubmission,
  toggleTeamSubmissionsModal,
  userUuid,
}: Props) => {
  const { t } = useTranslation();

  if (!teamSubmission) return null;

  return (
    <PresentationModal
      container={document.getElementById('presentation-custom-container')}
      onOpenChange={toggleTeamSubmissionsModal}>
      <PresentationModal.Header>
        <PresentationModal.Heading>
          {t('components.checkIns.allSubmissions')}
        </PresentationModal.Heading>
      </PresentationModal.Header>
      <PresentationModal.Body className='!mb-0'>
        <CheckInSubmissions submission={teamSubmission} userUuid={userUuid} />
      </PresentationModal.Body>
    </PresentationModal>
  );
};
