import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import FileItem, { File } from '@shared/components/FileList/FileItem/FileItem';
import { cx } from '@shared/utils/cx';

import SharedLoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import ArchiveFileModal from './ArchiveModal/ArchiveModal';
import styles from './FileList.module.sass';

type ProductSubmissionFileListProps = {
  files: File[];
  isUploading?: boolean;
  loading?: boolean;
  userUuid?: string;
  rounded?: boolean;
  variant?: 'primary' | 'light';
  onArchive?: (id: string) => Promise<void>;
  canArchiveAllFiles?: boolean;
  showSubmitter?: boolean;
  showDate?: boolean;
  className?: string;
  showModalOnArchive?: boolean;
};

const FileList = ({
  rounded,
  variant,
  files,
  isUploading,
  loading,
  userUuid,
  onArchive,
  canArchiveAllFiles,
  showSubmitter,
  showDate,
  className,
  showModalOnArchive = true,
}: ProductSubmissionFileListProps) => {
  const [fileIdToArchive, setFileIdToArchive] = useState<string | null>(null);
  const { t } = useTranslation();

  const onDismiss = () => setFileIdToArchive(null);

  const handleArchiveClick = (id: string) => {
    if (showModalOnArchive) {
      setFileIdToArchive(id);
    } else {
      onArchive && onArchive(id);
    }
  };

  const renderFiles = () =>
    files.map((file) => {
      const canDeleteFile = canArchiveAllFiles || file.submitter?.uuid === userUuid;

      return (
        <FileItem
          key={file.id}
          archiveDisabled={!canDeleteFile}
          archiveTooltipLabel={
            !canDeleteFile ? t('components.fileList.archive.disabled') : undefined
          }
          file={file}
          rounded={rounded}
          showDate={showDate}
          showSubmitter={showSubmitter}
          variant={variant}
          onArchive={onArchive && handleArchiveClick}
        />
      );
    });

  return (
    <>
      {isUploading && (
        <div className={styles.loader}>
          <SharedLoadingSpinner size='small' />
        </div>
      )}
      {!isEmpty(files) && (
        <ul aria-label={t('components.fileList.fileList')} className={cx(styles.list, className)}>
          {renderFiles()}
        </ul>
      )}
      {onArchive && fileIdToArchive && (
        <ArchiveFileModal
          fileId={fileIdToArchive}
          isOpen={Boolean(fileIdToArchive)}
          loading={loading}
          onArchive={onArchive}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};

export default FileList;
