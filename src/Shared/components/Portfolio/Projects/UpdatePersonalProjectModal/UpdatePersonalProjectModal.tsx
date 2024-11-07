import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import { PersonalProjectsForm } from '@shared/components/Portfolio/Projects/PersonalProjectForm';
import SharedModal from '@shared/components/Modal/Modal';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/constants';
import { fileUpload } from '@shared/services/aws';
import { getFormErrors } from '@shared/utils/graphql';
import { useCreatePortfolioProjectFileMutation } from '@shared/graphql/student/hooks/useCreatePortfolioProjectFileMutation';
import { useGeneratePresignedUploadUrlMutation } from '@shared/graphql/student/hooks/useGeneratePresignedUploadUrlMutation';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { useUpdatePortfolioProjectMutation } from '@shared/graphql/student/hooks/useUpdatePortfolioProjectMutation';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';

import styles from './UpdatePersonalProjectModal.module.sass';
import { updatePersonalProjectValidationSchema } from './helpers';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

export const UpdatePersonalProjectModal = () => {
  const { t } = useTranslation();
  const [generatePresignedUploadUrl] = useGeneratePresignedUploadUrlMutation();
  const [updatePersonalProject] = useUpdatePortfolioProjectMutation();
  const [createPortfolioProjectFile] = useCreatePortfolioProjectFileMutation();
  const {
    modifyPersonalProject: { modifyPersonalProjectData, setModifyPersonalProjectData },
    portfolioProjects: { projects, projectType },
  } = usePortfolioContext();
  const { isUpdateProjectModalOpen, projectId } = modifyPersonalProjectData;
  const editedProjectData = projects?.edges.find(
    ({ node: project }) => project.id === projectId
  )?.node;
  const [files, setFiles] = useState<any>(editedProjectData?.submission.files || []);
  const [uploadFilesProgress, setUploadFilesProgress] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const handleCloseModalAction = () =>
    setModifyPersonalProjectData({
      isDeleteProjectModalOpen: false,
      isUpdateProjectModalOpen: false,
      projectId: null,
    });

  const onProgress = (file: FileProps) => (percent: number) => {
    setUploadFilesProgress({
      ...uploadFilesProgress,
      [file.name]: percent,
    });
  };

  const handleSubmit = async (
    {
      imageData,
      projectName,
      projectDescription,
    }: { imageData: any; projectName: string; projectDescription: string },
    { setErrors }: any = {}
  ) => {
    if (projectId === null) return;

    try {
      setIsSaving(true);
      const { file: imageFile } = imageData;
      const newFiles = files.filter((file: FileProps) => !file.hasOwnProperty('id'));

      const imageResponse =
        imageFile &&
        (await fileUpload(
          imageFile,
          generatePresignedUploadUrl,
          // @ts-ignore
          RESOURCE_CLASS.PORTFOLIO_PROJECT,
          ASSET_TYPE.IMAGE
        ));

      imageFile && (await imageResponse?.promise);

      const filesResponses = await Promise.all(
        newFiles.map((file: FileProps) =>
          fileUpload(
            file,
            generatePresignedUploadUrl,
            // @ts-ignore
            RESOURCE_CLASS.PORTFOLIO_PROJECT_FILE,
            ASSET_TYPE.FILE,
            onProgress(file)
          )
        )
      );

      await Promise.all(filesResponses.map(({ promise }) => promise));

      const baseBody = {
        id: projectId,
        name: projectName,
        description: projectDescription,
        imageUuid: imageResponse?.uuid,
        imageFilename: imageResponse?.file.name,
      };

      const constructInput = () => {
        if (!imageData.src && !imageFile) {
          return { ...baseBody, imageUuid: null, imageFilename: null };
        }
        if (imageData && imageFile) {
          return {
            ...baseBody,
            imageUuid: imageResponse.uuid,
            imageFilename: imageResponse?.file.name,
          };
        }

        return baseBody;
      };

      const input = constructInput();

      await updatePersonalProject({ input, portfolioProjectType: projectType });

      await Promise.all(
        filesResponses.map((response) => {
          const input = {
            portfolioProjectId: projectId,
            fileUuid: response.uuid,
            fileFilename: response.file.name,
          };

          return createPortfolioProjectFile({
            input,
            portfolioProjectType: projectType,
          });
        })
      );

      callToast(
        'success',
        t('notifications.success.updated', { name: t('portfolioProjects.personalProject') })
      );
    } catch (error: any) {
      if (error instanceof ApolloError) {
        handleError(error);
      }

      const errors = getFormErrors(error);

      setErrors(errors);
    } finally {
      setIsSaving(false);
      handleCloseModalAction();
    }
  };

  const initialValues = {
    imageData: { src: editedProjectData?.imageUrl ?? null },
    projectDescription: editedProjectData?.description,
    projectFiles: editedProjectData?.submission.files,
    projectName: editedProjectData?.name,
  };

  return (
    <SharedModal isOpen={isUpdateProjectModalOpen} onDismiss={handleCloseModalAction}>
      <Formik
        // @ts-ignore
        initialValues={initialValues}
        validationSchema={updatePersonalProjectValidationSchema}
        onSubmit={handleSubmit}>
        {({ errors, submitForm }) => (
          <div className={styles.updateProjectModal}>
            <PersonalProjectsForm
              errors={errors}
              files={files}
              heading={t('portfolioProjects.modifyProjectModal.editProjectHeading')}
              isSaving={isSaving}
              setFiles={setFiles}
              submit={submitForm}
              uploadFilesProgress={uploadFilesProgress}
              onCancel={handleCloseModalAction}
            />
          </div>
        )}
      </Formik>
    </SharedModal>
  );
};
