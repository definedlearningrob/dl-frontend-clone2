import { useTranslation } from 'react-i18next';

import SharedUploadTypeButton from '@shared/components/UploadTypeButton/UploadTypeButton';
import { UPLOAD_FILE_TYPE } from '@shared/resources/enums';

import styles from './FileTypeSelector.module.sass';

type ProductSubmissionsTypeSelectorProps = {
  type: UPLOAD_FILE_TYPE;
  onChange: (type: UPLOAD_FILE_TYPE) => void;
};

const FileTypeSelector = ({ type, onChange }: ProductSubmissionsTypeSelectorProps) => {
  const buttonTypes = [UPLOAD_FILE_TYPE.FILE, UPLOAD_FILE_TYPE.GOOGLE];
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      {buttonTypes.map((buttonType) => (
        <SharedUploadTypeButton
          key={buttonType}
          selected={type === buttonType}
          text={t(`dropableArea.typeSelector.${buttonType}`)}
          type={buttonType}
          onClick={() => onChange(buttonType)}
        />
      ))}
    </header>
  );
};
export default FileTypeSelector;
