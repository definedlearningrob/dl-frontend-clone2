import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import SharedModal from '@shared/components/Modal/Modal';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/constants';
import { PersonalProjectsForm } from '@shared/components/Portfolio/Projects/PersonalProjectForm';
import { fileUpload } from '@shared/services/aws';
import { getFormErrors } from '@shared/utils/graphql';
import { useCreatePortfolioProjectFileMutation } from '@shared/graphql/student/hooks/useCreatePortfolioProjectFileMutation';
import { useCreatePortfolioProjectMutation } from '@shared/graphql/student/hooks/useCreatePortfolioProjectMutation';
import { useGeneratePresignedUploadUrlMutation } from '@shared/graphql/student/hooks/useGeneratePresignedUploadUrlMutation';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';

import { createValidationSchema } from './helpers';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

export const CreatePersonalProjectModal = () => {
  const { t } = useTranslation();
  const [generatePresignedUploadUrl] = useGeneratePresignedUploadUrlMutation();
  const [createPortfolioProjectFile] = useCreatePortfolioProjectFileMutation();
  const {
    createPortfolioProject: { setShowCreatePersonalProjectModal, showCreatePersonalProjectModal },
    portfolioProjects: { projectType },
  } = usePortfolioContext();
  const [createPortfolioProject] = useCreatePortfolioProjectMutation();
  const [files, setFiles] = useState<FileProps[]>([]);
  const [uploadFilesProgress, setUploadFilesProgress] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleCloseModalAction = () => setShowCreatePersonalProjectModal(false);

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
    setIsSaving(true);

    try {
      const imageResponse =
        imageData?.file &&
        (await fileUpload(
          imageData.file,
          generatePresignedUploadUrl,
          // @ts-ignore
          RESOURCE_CLASS.PORTFOLIO_PROJECT,
          ASSET_TYPE.IMAGE
        ));

      imageData?.file && (await imageResponse?.promise);

      const filesResponses = await Promise.all(
        files.map((file: FileProps) =>
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
        name: projectName,
        description: projectDescription,
      };

      const input = imageData?.file
        ? {
            ...baseBody,
            imageUuid: imageResponse.uuid,
            imageFilename: imageResponse?.file.name,
          }
        : baseBody;

      const {
        data: {
          // @ts-ignore
          createPortfolioProject: { portfolioProject },
        },
      } = await createPortfolioProject({ input, portfolioProjectType: projectType });

      await Promise.all(
        filesResponses.map((response) => {
          const input = {
            portfolioProjectId: portfolioProject.id,
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
        t('notifications.success.created', { name: t('portfolioProjects.personalProject') })
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
    imageData: null,
    projectDescription: '',
    projectFiles: [],
    projectName: '',
  };

  return (
    <SharedModal isOpen={showCreatePersonalProjectModal} onDismiss={handleCloseModalAction}>
      <Formik
        initialValues={initialValues}
        validationSchema={createValidationSchema('projectName', t('validation.messages.required'))}
        onSubmit={handleSubmit}>
        {({ errors, submitForm }) => (
          <div>
            <PersonalProjectsForm
              errors={errors}
              files={files}
              heading={t('portfolioProjects.modifyProjectModal.createProjectHeading')}
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
