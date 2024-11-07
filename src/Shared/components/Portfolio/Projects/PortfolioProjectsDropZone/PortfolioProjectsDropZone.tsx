import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as UploadFile } from '@shared/svg/upload_on_cloud.svg';

import styles from './PortfolioProjectsDropZone.module.sass';
import { MAX_UPLOAD_SIZE_MB } from './resources';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

type Props = {
  files: FileProps[];
  setFiles: (files: FileProps[]) => void;
};

function PortfolioProjectsDropZone({ files, setFiles }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const validateFiles = useCallback(
    (acceptedFiles) => {
      setErrorMessage('');

      if ([...files, ...acceptedFiles].length > 10) {
        setErrorMessage(t('portfolioProjects.dropzone.validation.exceededMaxFiles'));

        return false;
      }

      const validations = acceptedFiles.map((file: FileProps) => {
        const sizeInMB = parseInt((file.size / (1024 * 1024)).toFixed(2));
        const allowedFormatsRegex = /\.(pdf|doc|docx|txt|mp4|ppt|pptx|webm|jpg|jpeg|png)$/i;

        const currentFilesNames = files.map((file: FileProps) => file.filename);

        if (sizeInMB > MAX_UPLOAD_SIZE_MB) {
          setErrorMessage(t('portfolioProjects.dropzone.validation.exceededMaxSize'));

          return false;
        }

        if (!allowedFormatsRegex.test(file.filename)) {
          setErrorMessage(t('portfolioProjects.dropzone.validation.wrongExtension'));

          return false;
        }

        if (currentFilesNames.includes(file.filename)) {
          setErrorMessage(t('portfolioProjects.dropzone.validation.nameDuplication'));

          return false;
        }

        return true;
      });

      return validations.filter((validation: File) => validation).length === validations.length;
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles: FileProps[]) => {
      acceptedFiles.forEach((file: FileProps) => (file.filename = file.name));

      if (!validateFiles(acceptedFiles)) return;

      setFiles([...files, ...acceptedFiles]);
    },
    [files, validateFiles]
  );

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className={styles.dropZoneWrapper} {...getRootProps()}>
        <input data-testid='portfolio-drop-zone-input' {...getInputProps()} />
        <SharedIcon className={styles.dropZoneIcon} icon={<UploadFile />} size='sm' />
        {isDragActive ? (
          <p className={styles.dropZoneText}>{t('portfolio.dropzone.dropHere')}...</p>
        ) : (
          <p className={styles.dropZoneText}>
            {t('portfolioProjects.dropzone.dragAndDrop1')}
            <span className={styles.dropZoneLink}>
              {t('portfolioProjects.dropzone.chooseFile')}
            </span>
            {t('portfolioProjects.dropzone.dragAndDrop2')}.
          </p>
        )}
      </div>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </>
  );
}

export default PortfolioProjectsDropZone;
