import { Trans, useTranslation } from 'react-i18next';

import { groupFilesByDate } from '@shared/utils/groupFilesByDate';
import { SubmissionList } from '@shared/components/Submissions';
import { TPortfolioSubmissionFile } from '@shared/components/Portfolio/types';
import { useDeletePortfolioProjectFileMutation } from '@shared/graphql/student/hooks/useDeletePortfolioProjectFileMutation';
import FileItem from '@shared/components/FileList/FileItem/FileItem';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './PortfolioProjectsSubmissionModal.module.sass';

type Props = {
  currentUserUuid?: string;
  files: TPortfolioSubmissionFile[];
  teamSubmission: boolean;
  toggleModal: () => void;
};

export const PortfolioProjectsSubmissionModal = ({
  currentUserUuid,
  files,
  teamSubmission,
  toggleModal,
}: Props) => {
  const { t } = useTranslation();
  const [deletePortfolioProjectFile, { error: deletePortfolioProjectFileError }] =
    useDeletePortfolioProjectFileMutation();

  const handlePersonalProjectFileDeletion = async (id: string) => {
    try {
      if (id) {
        await deletePortfolioProjectFile(id);

        callToast(
          'success',
          t('notifications.success.deleted', {
            name: t('portfolioProjects.personalProjectFile'),
          })
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('handlePersonalProjectFileDeletion => error', {
        error,
        deletePortfolioProjectFileError,
      });
    }
  };

  const parsedFiles = groupFilesByDate(files).map((file) => ({
    ...file,
    content: (
      <ul className={styles.fileList}>
        {file.content.map((fileItself) => {
          const canDeleteFile = fileItself.isOwner;

          return (
            <FileItem
              key={fileItself.id}
              archiveDisabled={!canDeleteFile}
              className={styles.fileItem}
              file={fileItself}
              variant='primary'
              withoutBorder={true}
              onArchive={handlePersonalProjectFileDeletion}
            />
          );
        })}
      </ul>
    ),
  }));

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header className={styles.modalHeader}>
        <SharedModal.Heading>
          <Trans i18nKey='portfolioProjects.modalHeading' values={{ fileCount: files.length }}>
            <span className={styles.fileCounter} />
          </Trans>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <SubmissionList
          fullWidth={true}
          hideAvatars={!teamSubmission}
          submissions={parsedFiles}
          userUuid={currentUserUuid}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={toggleModal}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
