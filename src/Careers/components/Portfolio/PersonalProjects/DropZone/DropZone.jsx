import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { MAX_UPLOAD_SIZE_MB } from '@dc/resources/constants';
import { ReactComponent as UploadFile } from '@dc/svg/upload_on_cloud.svg';

import SharedIcon from '@shared/components/Icon/Icon';

StudentPortfolioPersonalProjectsDropZone.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
};

function StudentPortfolioPersonalProjectsDropZone({ files, setFiles }) {
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
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        // eslint-disable-next-line max-len
        const allowedFormatsRegex =
          /\.(pdf|doc|docx|xls|xlsx|csv|txt|rtf|html|zip|mp3|wma|mpg|flv|avi|jpg|jpeg|png|gif|mp4|ppt|pptx|webm)$/i;

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
          setErrorMessage(t('portfolio.validation.nameDuplication'));

          return false;
        }

        return true;
      });

      const allValidationPassed =
        validations.filter((validation) => validation).length === validations.length;

      return allValidationPassed;
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
      <div className='portfolio-drop-zone' {...getRootProps()}>
        <input data-testid='portfolio-drop-zone-input' {...getInputProps()} />
        <SharedIcon className='portfolio-drop-zone__icon' icon={<UploadFile />} size='sm' />
        {isDragActive ? (
          <p className='portfolio-drop-zone__text-wrapper'>{t('portfolio.dropzone.dropHere')}...</p>
        ) : (
          <p className='portfolio-drop-zone__text-wrapper'>
            {t('portfolio.dropzone.dragAndDrop1')}
            <span className='portfolio-drop-zone__link-text'>
              {' '}
              {t('portfolio.dropzone.chooseFile')}{' '}
            </span>
            {t('portfolio.dropzone.dragAndDrop2')}.
          </p>
        )}
      </div>
      {errorMessage && <span className='portfolio-drop-zone__error-message'>{errorMessage}</span>}
    </>
  );
}

export default StudentPortfolioPersonalProjectsDropZone;
