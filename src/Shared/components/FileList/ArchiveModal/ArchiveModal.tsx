import { t } from 'i18next';

import SharedModal from '@shared/components/Modal/Modal';

type ArchiveSubmissionFileModalProps = {
  fileId: string;
  isOpen: boolean;
  loading?: boolean;
  onArchive: (fileId: string) => Promise<void>;
  onDismiss: () => void;
};

const ArchiveFileModal = ({
  fileId,
  isOpen,
  loading,
  onArchive,
  onDismiss,
}: ArchiveSubmissionFileModalProps) => {
  const handleDelete = async () => {
    await onArchive(fileId);
    onDismiss();
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading type='h3'>
          {t('components.fileList.archive.title')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>{t('components.fileList.archive.text')}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button disabled={loading} variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button isLoading={loading} variant='danger' onClick={handleDelete}>
          {t('common.actions.archive')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default ArchiveFileModal;
