import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

import styles from './UploadedFileButtons.module.sass';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

type Props = {
  file: FileProps;
  handleDownload: () => void;
  onDelete: (file: FileProps) => void;
};

export const UploadedFileButtons = ({ file, handleDownload, onDelete }: Props) => {
  const { t } = useTranslation();

  const deleteButtonClasses = cx(styles.uploadFileButton, {
    [styles.deleteFileButton]: file.id,
  });

  const removeItem = () => {
    onDelete(file);
  };

  return (
    <>
      <DeprecatedTooltip
        message={t('portfolioProjects.fileTooltip.download')}
        position='top'
        variant='dark'>
        {file.id && (
          <DeprecatedIconButton.Download
            className={styles.uploadFileButton}
            size='xs'
            square={true}
            onClick={handleDownload}
          />
        )}
      </DeprecatedTooltip>
      <DeprecatedTooltip
        message={t(`portfolioProjects.fileTooltip.${file.id ? 'remove' : 'cancel'}`)}
        position='top'
        variant='dark'>
        {file.id ? (
          <DeprecatedIconButton.Delete
            className={deleteButtonClasses}
            size='xs'
            square={true}
            onClick={removeItem}
          />
        ) : (
          <DeprecatedIconButton.Cancel
            className={deleteButtonClasses}
            size='xs'
            square={true}
            onClick={removeItem}
          />
        )}
      </DeprecatedTooltip>
    </>
  );
};
