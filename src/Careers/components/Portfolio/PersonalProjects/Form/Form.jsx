import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import DropZone from '@dc/components/Portfolio/PersonalProjects/DropZone/DropZone';
import FileList from '@dc/components/Portfolio/PersonalProjects/FileList/FileList.jsx';
import SharedImageInput from '@dc/shared/ImageInput/ImageInput';
import { ReactComponent as UploadThumbnail } from '@dc/svg/upload_thumbnail.svg';
import { TabsContext } from '@dc/components/Portfolio/Tabs/Tabs';

import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedModal from '@shared/components/Modal/Modal';

StudentPortfolioPersonalProjectsForm.propTypes = {
  errors: PropTypes.shape({
    imageData: PropTypes.string,
    projectName: PropTypes.string,
  }),
  files: PropTypes.array,
  heading: PropTypes.string,
  isSaving: PropTypes.bool,
  onCancel: PropTypes.func,
  setFiles: PropTypes.func,
  submit: PropTypes.func,
  uploadFilesProgress: PropTypes.shape({
    file: PropTypes.object,
    progress: PropTypes.number,
  }),
};

function StudentPortfolioPersonalProjectsForm({
  errors,
  files,
  heading,
  isSaving,
  onCancel,
  setFiles,
  submit,
  uploadFilesProgress,
}) {
  const { t } = useTranslation();
  const { personalProjectState } = useContext(TabsContext);
  const [projectImageInput, , projectImageHelpers] = useField('imageData');
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <SharedModal.Header>
        <SharedModal.Heading>{heading}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='create-portfolio-project-modal__inputs-container'>
          <SharedImageInput
            errorMessage={errors.imageData}
            inputConfig={{
              ...projectImageInput,
              onChange: projectImageHelpers.setValue,
              icon: <UploadThumbnail />,
              placeholder: 'Upload Thumbnail',
            }}
          />
          <div className='create-portfolio-project-modal__inputs-container-body'>
            <SharedFormTextInput
              label={t('portfolio.projects.projectName')}
              name='projectName'
              placeholder={t('portfolio.projects.projectNameWithDots')}
            />
            <SharedFormTextarea
              className='student-check-in-question__textarea'
              label={t('portfolio.projects.projectDescription')}
              name='projectDescription'
              placeholder={t('portfolio.projects.description')}
            />
          </div>
        </div>
        <p className='create-portfolio-project-modal__project-files-heading'>
          {t('portfolio.projects.projectFiles')}
        </p>
        <DropZone files={files} setFiles={setFiles} />
        <FileList
          files={files}
          isSaving={isSaving}
          personalProjectState={personalProjectState}
          projectId={personalProjectState?.projectId}
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
          onClick={submit}>
          {personalProjectState?.showEditPersonalProjectModal
            ? t('common.actions.update')
            : t('common.actions.create')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </>
  );
}

export default StudentPortfolioPersonalProjectsForm;
