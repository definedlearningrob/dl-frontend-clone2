import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import generatePresignedUploadUrlMutation from '@dc/graphql/student/mutations/generatePresignedUploadUrl';
import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';
import { fileUpload } from '@dc/services/aws';

import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/constants';
import { ReactComponent as Cancel } from '@shared/svg/clear.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './ResumeFileItem.module.sass';

ResumeFileItem.propTypes = {
  addUploadedFile: PropTypes.func,
  file: PropTypes.object,
  onDelete: PropTypes.func,
  onUploadComplete: PropTypes.func,
};

const cancelButtonClassNames = cx(styles.button, styles.buttonCancel);

export function ResumeFileItem(props) {
  const { addUploadedFile, file, onDelete, onUploadComplete } = props;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(true);
  // const [file, setFile] = useState(passedFile);
  const [response, setResponse] = useState(null);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrlMutation);
  const { t } = useTranslation();

  useUpdateEffect(() => {
    if (!isUploading) {
      onUploadComplete(file);
    }
  }, [isUploading]);

  const fileItemClasses = cx(styles.info, { [styles.success]: !isUploading });

  const onProgress = (percent) => {
    setUploadProgress(percent);

    if (percent === 100) {
      setIsUploading(false);
    }
  };

  const uploadFile = async () => {
    try {
      const response = await fileUpload(
        file,
        getPresignedUrl,
        RESOURCE_CLASS.RESUME,
        ASSET_TYPE.FILE,
        onProgress
      );

      const uploadedFile = {
        filename: response.file.filename,
        uuid: response.uuid,
        url: response.url,
        isUploaded: false,
      };

      setResponse(response);

      addUploadedFile(uploadedFile);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => () => response?.abort(), []);

  useEffect(() => {
    if (file.uuid) return;

    uploadFile();
  }, [file]);

  const removeItem = () => {
    response && response.abort();
    onDelete(file);
  };

  return (
    <li className={styles.item} data-testid='resume-modal-item'>
      <div className={styles.wrapper}>
        <div className={fileItemClasses}>
          {isUploading ? (
            <>
              <SharedLoadingSpinner className={styles.loadingSpinner} size='small' />
              <p className={styles.name}>{file.filename}</p>
            </>
          ) : (
            <>
              <SharedIcon icon={<SharedFileExtensionIcon filename={file.filename} />} size='sm' />
              <p className={styles.name}>{file.filename}</p>
            </>
          )}
        </div>
        <Tooltip
          message={t(`portfolioProjects.fileTooltip.${file.isUploaded ? 'remove' : 'cancel'}`)}>
          <DeprecatedIconButton
            className={cancelButtonClassNames}
            icon={file.isUploaded ? <Delete /> : <Cancel />}
            square={true}
            onClick={removeItem}
          />
        </Tooltip>
      </div>
      {isUploading && (
        <div className={styles.progressContainer}>
          <div className={styles.progressIndicator} style={{ width: `${uploadProgress}%` }} />
        </div>
      )}
    </li>
  );
}
