import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import FormImageInput, { PreviewImageType } from '@shared/components/FormImageInput';
import PortfolioProjectsDropZone from '@shared/components/Portfolio/Projects/PortfolioProjectsDropZone';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import SharedModal from '@shared/components/Modal/Modal';
import { ReactComponent as UploadThumbnail } from '@shared/svg/upload_thumbnail.svg';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';

import { FormFileList } from './FormFileList';
import styles from './PersonalProjectsForm.module.sass';

type FileProps = File & {
  filename: string;
  id: string;
  url: string;
};

type Props = {
  errors: any;
  files: FileProps[];
  heading: string;
  isSaving: boolean;
  onCancel: () => void;
  setFiles: (files: FileProps[]) => void;
  submit: () => void;
  uploadFilesProgress: any;
};

export const PersonalProjectsForm = ({
  errors,
  files,
  heading,
  isSaving,
  onCancel,
  setFiles,
  submit,
  uploadFilesProgress,
}: Props) => {
  const { t } = useTranslation();
  const {
    createPortfolioProject: { showCreatePersonalProjectModal },
  } = usePortfolioContext();
  const [projectImageInput, , projectImageHelpers] = useField('imageData');
  const { isSubmitting } = useFormikContext();

  const [previewImage, setPreviewImage] = useState<PreviewImageType>();

  const handleSubmitFile = () => {
    setPreviewImage(previewImage);
    submit();
  };

  return (
    <>
      <SharedModal.Header>
        <SharedModal.Heading>{heading}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className={styles.body}>
          <FormImageInput
            errorMessage={errors.imageData}
            inputConfig={{
              ...projectImageInput,
              onChange: projectImageHelpers.setValue,
              onClear: projectImageHelpers.setValue,
              icon: <UploadThumbnail />,
              placeholder: t('portfolioProjects.modifyProjectModal.uploadThumbnail'),
            }}
            onChange={setPreviewImage}
          />
          <div className={styles.inputsWrapper}>
            <SharedFormTextInput
              label={t('portfolioProjects.modifyProjectModal.projectName')}
              name='projectName'
              placeholder={t('portfolioProjects.modifyProjectModal.projectNameWithDots')}
            />
            <SharedFormTextarea
              className={styles.formTextarea}
              label={t('portfolioProjects.modifyProjectModal.projectDescription')}
              name='projectDescription'
              placeholder={t('portfolioProjects.modifyProjectModal.projectDescriptionWithDots')}
            />
          </div>
        </div>
        <p className={styles.filesHeading}>
          {t('portfolioProjects.modifyProjectModal.projectFiles')}
        </p>
        <PortfolioProjectsDropZone files={files} setFiles={setFiles} />
        <FormFileList
          files={files}
          isSaving={isSaving}
          setFiles={setFiles}
          uploadFilesProgress={uploadFilesProgress}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='upload-modal-save-button'
          disabled={isSubmitting}
          isLoading={isSubmitting}
          variant='primary'
          onClick={handleSubmitFile}>
          {showCreatePersonalProjectModal ? t('common.actions.create') : t('common.actions.update')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </>
  );
};
