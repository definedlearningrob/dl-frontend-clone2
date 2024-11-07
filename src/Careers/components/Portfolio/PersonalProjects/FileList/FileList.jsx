import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import deletePortfolioProjectFileMutation from '@dc/graphql/student/mutations/deletePortfolioProjectFile';
import FileItem from '@dc/components/Portfolio/PersonalProjects/FileList/FileItem/FileItem';
import { removeFromCache } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

StudentPortfolioPersonalProjectsFileList.propTypes = {
  files: PropTypes.array,
  isSaving: PropTypes.bool,
  projectId: PropTypes.string,
  setFiles: PropTypes.func,
  uploadFilesProgress: PropTypes.shape({
    file: PropTypes.object,
    progress: PropTypes.number,
  }),
};

function StudentPortfolioPersonalProjectsFileList({
  files,
  isSaving,
  projectId,
  setFiles,
  uploadFilesProgress,
}) {
  const { t } = useTranslation();
  const [deletePortfolioProjectFile, { loading: pendingDeletion }] = useMutation(
    deletePortfolioProjectFileMutation
  );

  const handleFileDelete = async (passedFile) => {
    try {
      if (passedFile.id) {
        await deletePortfolioProjectFile({
          variables: { input: { id: passedFile.id } },
          update: removeFromCache(passedFile.id, 'PortfolioProjectFile'),
        });

        callToast(
          'success',
          t('common.notifications.success.deleted', {
            name: t('portfolio.projects.personalProjectFile'),
          })
        );
      }

      const filteredFiles = files.filter((file) => file.filename !== passedFile.filename);

      setFiles(filteredFiles);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('handlePersonalProjectFileDeletion => error', error);
    }
  };

  return !files.length ? null : (
    <ul className='personal-projects-upload-files-container'>
      {files.map((file) => (
        <FileItem
          key={file.name || file.id}
          file={file}
          isSaving={isSaving}
          pendingDeletion={pendingDeletion}
          projectId={projectId}
          uploadFileProgress={uploadFilesProgress[file.filename]}
          onDelete={handleFileDelete}
        />
      ))}
    </ul>
  );
}

export default StudentPortfolioPersonalProjectsFileList;
