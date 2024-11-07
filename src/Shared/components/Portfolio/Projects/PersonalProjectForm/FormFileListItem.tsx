import cx from 'classnames';
import { useRef } from 'react';

import FileExtensionIcon from '@shared/components/FileExtensionIcon';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import { UploadedFileButtons } from './UploadedFileButtons';
import styles from './FormFileListItem.module.sass';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

type Props = {
  file: FileProps;
  isSaving: boolean;
  onDelete: (file: FileProps) => void;
  pendingDeletion: boolean;
  uploadFileProgress: number;
};

const FormFileListItem = ({
  file,
  isSaving,
  onDelete,
  pendingDeletion,
  uploadFileProgress,
}: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const fileItemClasses = cx(styles.fileItemInfo, {
    [styles.fileSuccess]: !isSaving,
  });
  const showButtons = !isSaving && !pendingDeletion;

  const handleDownload = () => linkRef?.current?.click();

  return (
    <li className={styles.fileItem} data-testid='personal-project-file-item'>
      <div className={styles.fileItemWrapper}>
        <div className={fileItemClasses}>
          {isSaving ? (
            <>
              <SharedLoadingSpinner className={styles.loadingSpinner} size='small' />
              <p className={styles.fileName}>{file.filename}</p>
            </>
          ) : (
            <>
              <SharedIcon icon={<FileExtensionIcon filename={file.filename} />} size='sm' />
              <a
                ref={linkRef}
                className={styles.fileName}
                download={file.filename}
                href={file.url}
                rel='noopener noreferrer'
                target='_blank'>
                {file.filename}
              </a>
            </>
          )}
        </div>
        {showButtons && (
          <UploadedFileButtons file={file} handleDownload={handleDownload} onDelete={onDelete} />
        )}
      </div>
      {(isSaving || pendingDeletion) && (
        <div className={styles.progressContainer}>
          <div className={styles.progressIndicator} style={{ width: `${uploadFileProgress}%` }} />
        </div>
      )}
    </li>
  );
};

export default FormFileListItem;
