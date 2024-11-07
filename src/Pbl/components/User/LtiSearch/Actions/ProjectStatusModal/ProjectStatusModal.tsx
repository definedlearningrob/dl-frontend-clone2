import { useTranslation } from 'react-i18next';

import { useArchiveProjectMutation } from '@pbl/graphql/user/hooks/useArchiveProjectMutation';
import { useRestoreProjectMutation } from '@pbl/graphql/user/hooks/useRestoreProjectMutation';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

type ArchiveProjectModalProps = {
  isArchived: boolean;
  projectId: string;
  projectName: string;
  onDismiss: () => void;
};

const ProjectStatusModal = ({
  isArchived,
  projectId,
  projectName,
  onDismiss,
}: ArchiveProjectModalProps) => {
  const [archiveProject] = useArchiveProjectMutation({ id: projectId });
  const [restoreProject] = useRestoreProjectMutation({ id: projectId });
  const { t } = useTranslation();

  const onSubmit = async () => {
    const newStatus = isArchived ? t('common.actions.unarchived') : t('common.actions.archived');
    const toastMessage = t('user.myProjects.toastMessage', { projectName, newStatus });

    try {
      isArchived ? restoreProject() : archiveProject();

      callToast('success', toastMessage);
      onDismiss();
    } catch (error) {
      //eslint-disable-next-line
      console.error('🚀 ~ file: ArchiveModal.tsx:56 ~ handleArchiveItem ~ error', error);
      callToast('error', 'There was an error processing the request.');
    }
  };

  const bodyContent = isArchived ? (
    t('user.myProjects.unarchiveMessage', { projectName })
  ) : (
    <>
      {t('user.myProjects.archiveMessage', { projectName })}
      <br />
      {t('user.myProjects.archiveMessageInfo')}
    </>
  );

  return (
    <SharedModal onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {isArchived ? t('user.myProjects.unarchiveTitle') : t('user.myProjects.archiveTitle')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>{bodyContent}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button variant='danger' onClick={onSubmit}>
          {isArchived ? t('common.actions.unarchive') : t('common.actions.archive')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ProjectStatusModal;
