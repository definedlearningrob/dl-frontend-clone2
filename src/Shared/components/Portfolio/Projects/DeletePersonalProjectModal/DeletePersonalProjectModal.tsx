import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { useDeletePortfolioProjectMutation } from '@shared/graphql/student/hooks/useDeletePortfolioProjectMutation';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';

import styles from './DeletePersonalProjectModal.module.sass';

const DeletePersonalProjectModal = () => {
  const { t } = useTranslation();
  const [deletePortfolioProject, { loading: deletePortfolioProjectLoading }] =
    useDeletePortfolioProjectMutation();
  const {
    modifyPersonalProject: { modifyPersonalProjectData, setModifyPersonalProjectData },
  } = usePortfolioContext();
  const { isDeleteProjectModalOpen, projectId } = modifyPersonalProjectData;
  const handleCloseModalAction = () => {
    setModifyPersonalProjectData({
      isDeleteProjectModalOpen: false,
      isUpdateProjectModalOpen: false,
      projectId: null,
    });
  };

  const handleDeleteProject = async () => {
    if (projectId === null) return;

    try {
      await deletePortfolioProject(projectId);

      callToast(
        'success',
        t('notifications.success.deleted', {
          name: t('portfolioProjects.deleteProjectModal.project'),
        })
      );

      handleCloseModalAction();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <SharedModal isOpen={isDeleteProjectModalOpen} onDismiss={handleCloseModalAction}>
      <SharedModal.Header className={styles.header}>
        <SharedModal.Heading>
          {t('portfolioProjects.deleteProjectModal.heading')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.body}>
        <p>{t('portfolioProjects.deleteProjectModal.infoText')}</p>
      </SharedModal.Body>
      <SharedModal.Footer className={styles.footer}>
        <SharedModal.Button variant='primary-outlined' onClick={handleCloseModalAction}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='upload-modal-save-button'
          isLoading={deletePortfolioProjectLoading}
          variant='primary'
          onClick={handleDeleteProject}>
          {t('common.actions.delete')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default DeletePersonalProjectModal;
