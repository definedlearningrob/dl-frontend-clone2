import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedDropableArea from '@shared/components/DropableArea/DropableArea';
import SharedAccordion from '@shared/components/Accordion/Accordion';

import ExtensionsModalFileList from './List/List';
import styles from './Files.module.sass';

type Props = {
  isEditing: boolean;
};

const ExtensionsModalFiles = ({ isEditing }: Props) => {
  const [filesField, _, filesFieldHelpers] = useField('files');
  const { t } = useTranslation();

  const onDrop = (files: Blob[]) => {
    filesFieldHelpers.setValue([...files, ...filesField.value]);
  };

  return (
    <div className={styles.wrapper}>
      <SharedAccordion title={t('user.dashboard.extensionFields.modal.files')}>
        <SharedDropableArea label='' multiple={true} onDrop={onDrop} />
        <ExtensionsModalFileList isEditing={isEditing} />
      </SharedAccordion>
    </div>
  );
};

export default ExtensionsModalFiles;
