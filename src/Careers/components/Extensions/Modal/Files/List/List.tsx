import cx from 'classnames';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DownloadIcon } from '@dc/svg/download_to.svg';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';

import styles from './List.module.sass';

type TExistingFile = {
  id: string;
  filename: string;
  url: string;
};

type TNewFile = File;

type TFile = TExistingFile | TNewFile;

type Props = {
  isEditing: boolean;
};

const ExtensionsModalFileList = ({ isEditing }: Props) => {
  const [filesField, _, filesFieldHelpers] = useField('files');
  const { t } = useTranslation();

  const generateUploadText = (name: string) =>
    isEditing
      ? t('user.dashboard.extensionFields.modal.uploadingEdit', { name })
      : t('user.dashboard.extensionFields.modal.uploadingCreate', { name });

  const isExistingFile = (file: TFile) => 'filename' in file;

  const removeFromList = (index: number) => () => {
    const newFileList = filesField.value.filter((_: any, i: number) => i !== index);

    filesFieldHelpers.setValue(newFileList);
  };

  const renderExistingFile = (file: TExistingFile, index: number) => (
    <li key={index} className={styles.listItem}>
      <span>{file.filename}</span>
      <div className={styles.buttons}>
        <a download={file.filename} href={file.url} target='_blank'>
          <DeprecatedIconButton
            className={styles.downloadButton}
            icon={<DownloadIcon />}
            size='sm'
            square={true}
          />
        </a>
        <DeprecatedIconButton
          className={cx(styles.archiveButton, styles.ml)}
          icon={<DeleteIcon />}
          rel='noopener noreferrer'
          size='sm'
          square={true}
          onClick={removeFromList(index)}
        />
      </div>
    </li>
  );

  const renderNewFile = (file: TNewFile, index: number) => (
    <li key={index} className={styles.listItem} id={`file-${file.name}`}>
      <span>{generateUploadText(file.name)}...</span>
      <DeprecatedIconButton
        className={styles.archiveButton}
        icon={<DeleteIcon />}
        size='sm'
        square={true}
        onClick={removeFromList(index)}
      />
    </li>
  );

  return (
    <ul>
      {filesField.value.map((file: any, index: number) =>
        isExistingFile(file) ? renderExistingFile(file, index) : renderNewFile(file, index)
      )}
    </ul>
  );
};

export default ExtensionsModalFileList;
