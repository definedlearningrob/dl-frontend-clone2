import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { MAX_UPLOAD_SIZE_MB } from '@dc/resources/constants';
import { ReactComponent as UploadFile } from '@dc/svg/upload_on_cloud.svg';

import SharedIcon from '@shared/components/Icon/Icon';

import styles from './DropZone.module.sass';

StudentLessonAssignmentDropZone.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
};

function StudentLessonAssignmentDropZone({ files, setFiles }) {
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();

  const validateFiles = useCallback(
    (acceptedFiles) => {
      setErrorMessage('');

      if ([...files, ...acceptedFiles].length > 10) {
        setErrorMessage(t('portfolio.validation.exceededMaxFiles'));

        return false;
      }

      const validations = acceptedFiles.map((file) => {
        const sizeInMB = +(file.size / (1024 * 1024)).toFixed(2);
        const allowedFormatsRegex = /\.(doc|docx|pdf|ppt|pptx|mp4|webm|txt)$/i;
        const currentFilesNames = files.map((file) => file.filename);

        if (sizeInMB > MAX_UPLOAD_SIZE_MB) {
          setErrorMessage(t('portfolio.validation.exceededMaxSize'));

          return false;
        }

        if (!allowedFormatsRegex.test(file.filename)) {
          setErrorMessage(t('portfolio.validation.wrongExtension'));

          return false;
        }

        if (currentFilesNames.includes(file.filename)) {
          setErrorMessage(t('portfolioProjects.dropzone.validation.nameDuplication'));

          return false;
        }

        return true;
      });

      return validations.filter((validation) => validation).length === validations.length;
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => (file.filename = file.name));

      if (!validateFiles(acceptedFiles)) return;

      setFiles([...files, ...acceptedFiles]);
    },
    [files, validateFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className={styles.dropZone} {...getRootProps()}>
        <input data-testid='drop-zone-input' {...getInputProps()} />
        <SharedIcon className={styles.icon} icon={<UploadFile />} size='sm' />
        {isDragActive ? (
          <p className={styles.textWrapper}>{t('portfolioDropzone.dropHere')}...</p>
        ) : (
          <p className={styles.textWrapper}>
            {t('portfolioDropzone.dragAndDrop1')}
            <span className={styles.linkText}> {t('portfolioDropzone.chooseFile')} </span>
            {t('portfolioDropzone.dragAndDrop2')}.
          </p>
        )}
      </div>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </>
  );
}

export default StudentLessonAssignmentDropZone;
