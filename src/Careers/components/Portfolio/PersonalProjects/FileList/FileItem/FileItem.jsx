import { useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';
import { ReactComponent as Download } from '@dc/svg/download_to.svg';
import { ReactComponent as Cancel } from '@dc/svg/clear.svg';
import '@dc/components/Portfolio/PersonalProjects/FileList/FileItem/FileItem.sass';

import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';

StudentPortfolioPrsonalProjectsFileListFileItem.propTypes = {
  file: PropTypes.object,
  isSaving: PropTypes.bool,
  onDelete: PropTypes.func,
  pendingDeletion: PropTypes.bool,
  projectId: PropTypes.string,
  uploadFileProgress: PropTypes.number,
};

function StudentPortfolioPrsonalProjectsFileListFileItem({
  file,
  isSaving,
  onDelete,
  pendingDeletion,
  uploadFileProgress,
}) {
  const { t } = useTranslation();
  const linkRef = useRef(null);
  const deleteButtonClasses = cx('personal-project-file-item__button', {
    '-delete-existing-file': file.id,
  });
  const fileItemClasses = cx('personal-project-file-item__info', { '-success': !isSaving });

  const removeItem = () => {
    onDelete(file);
  };

  const handleDownload = () => linkRef.current.click();

  const downloadButton = (
    <DeprecatedTooltip
      className='personal-project-file-item__tooltip'
      message={t('portfolio.fileTooltip.download')}>
      {file.id && (
        <DeprecatedIconButton
          className='personal-project-file-item__button'
          icon={<Download />}
          square={true}
          onClick={handleDownload}
        />
      )}
    </DeprecatedTooltip>
  );

  const deleteButton = (
    <DeprecatedTooltip
      className='personal-project-file-item__tooltip'
      message={t(`portfolio.fileTooltip.${file.id ? 'remove' : 'cancel'}`)}>
      <DeprecatedIconButton
        className={deleteButtonClasses}
        icon={file.id ? <Delete /> : <Cancel />}
        square={true}
        onClick={removeItem}
      />
    </DeprecatedTooltip>
  );

  return (
    <li className='personal-project-file-item' data-testid='personal-project-file-item'>
      <div className='personal-project-file-item__wrapper'>
        <div className={fileItemClasses}>
          {isSaving ? (
            <>
              <SharedLoadingSpinner
                className='personal-project-file-item__loading-spinner'
                size='small'
              />
              <p className='personal-project-file-item__name'>{file.filename}</p>
            </>
          ) : (
            <>
              <SharedIcon icon={<SharedFileExtensionIcon filename={file.filename} />} size='sm' />
              <a
                ref={linkRef}
                className='personal-project-file-item__name'
                download={file.filename}
                href={file.url}
                rel='noopener noreferrer'
                target='_blank'>
                {file.filename}
              </a>
            </>
          )}
        </div>
        {!isSaving && !pendingDeletion && downloadButton}
        {!isSaving && !pendingDeletion && deleteButton}
      </div>
      {(isSaving || pendingDeletion) && (
        <div className='personal-project-file-item__progress-container'>
          <div
            className='personal-project-file-item__progress-inticator'
            style={{ width: `${uploadFileProgress}%` }}
          />
        </div>
      )}
    </li>
  );
}

export default StudentPortfolioPrsonalProjectsFileListFileItem;
