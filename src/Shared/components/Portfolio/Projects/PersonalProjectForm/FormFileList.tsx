import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { useDeletePortfolioProjectFileMutation } from '@shared/graphql/student/hooks/useDeletePortfolioProjectFileMutation';
import { callToast } from '@shared/components/Toaster/Toaster';

import FormListFileItem from './FormFileListItem';
import styles from './FormFileList.module.sass';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

type Props = {
  files: FileProps[];
  isSaving: boolean;
  setFiles: (files: FileProps[]) => void;
  uploadFilesProgress: any;
};

export const FormFileList = ({ files, isSaving, setFiles, uploadFilesProgress }: Props) => {
  const { t } = useTranslation();
  const [
    deletePortfolioProjectFile,
    { error: portfolioProjectFilesError, loading: deletePortfolioProjectFileLoading },
  ] = useDeletePortfolioProjectFileMutation();

  const handleFileDelete = async (passedFile: FileProps) => {
    try {
      if (passedFile.id) {
        await deletePortfolioProjectFile(passedFile.id);

        callToast(
          'success',
          t('notifications.success.deleted', {
            name: t('portfolioProjects.personalProjectFile'),
          })
        );
      }

      const filteredFiles = files.filter(
        (file: FileProps) => file.filename !== passedFile.filename
      );

      setFiles(filteredFiles);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('handlePersonalProjectFileDeletion => error', {
        error,
        portfolioProjectFilesError,
      });
    }
  };

  return isEmpty(files) ? null : (
    <ul className={styles.container}>
      {files.map((file: FileProps) => (
        <FormListFileItem
          key={file.filename || file.id}
          file={file}
          isSaving={isSaving}
          pendingDeletion={deletePortfolioProjectFileLoading}
          uploadFileProgress={uploadFilesProgress[file.filename]}
          onDelete={handleFileDelete}
        />
      ))}
    </ul>
  );
};
