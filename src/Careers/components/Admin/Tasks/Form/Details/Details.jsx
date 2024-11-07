import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import SharedImageInput from '@dc/shared/ImageInput/ImageInput';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import SharedUploadInput from '@dc/shared/UploadInput/UploadInput';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { shapeTask } from '@dc/resources/typeDefs';
import { shapeTaskForm } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import StatusBadge from '@shared/components/StatusBadge/StatusBadge';
import { Select } from '@shared/components/Select';

AdminTasksFormDetails.propTypes = {
  ...shapeTaskForm,
  setShowNewPresentationModal: PropTypes.func,
  task: shapeTask,
};

function AdminTasksFormDetails({
  disabledTaskFileInput,
  errors,
  onTaskFileRemove,
  setShowNewPresentationModal,
  task,
  touched,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const taskPresentationExist = !!task?.presentation?.id;
  const [teachingResourcesInput, , teachingResourcesHelpers] = useField('teachingResources');
  const [introductionInput, , introductionHelpers] = useField('introduction');
  const [studentResourcesInput, , studentResourcesHelpers] = useField('studentResources');
  const [standardInput, , standardHelpers] = useField('standard');
  const [filesInput, , filesHelpers] = useField('files');
  const [imageInput, , imageHelpers] = useField('imageData');
  const [statusInput, , statusHelpers] = useField('status');
  const [filesDescriptionInput, , filesDescriptionHelpers] = useField('filesDescription');
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const taskPresentationStatus = task?.presentation ? task.presentation.status : 'N/A';

  const taskStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];

  const handlePresentationBuilderClick = () => {
    if (taskPresentationExist) {
      history.push(`/admin/tasks/${task.id}/presentation-builder`);
    }

    if (!taskPresentationExist) {
      setShowNewPresentationModal(true);
    }
  };

  return (
    <>
      <SharedFormDivider />
      <div className='admin-form__details-container'>
        <SharedImageInput
          data-testid='task-image-input'
          errorMessage={touched.imageData && errors.imageData}
          inputConfig={{ ...imageInput, onChange: imageHelpers.setValue }}
        />
        <div className='admin-form__details-text-inputs flex flex-col gap-sm'>
          <SharedFormTextInput
            data-testid='task-name-input'
            isRequired={true}
            label={t('common.fields.common.name')}
            name='name'
          />
          <SharedFormTextInput
            data-testid='task-display-name-input'
            isRequired={false}
            label={t('common.fields.common.displayName')}
            name='displayName'
          />
          <Select
            {...statusInput}
            data-testid='task-status-input'
            errorMessage={touched.status && errors.status}
            isRequired={true}
            label={t('common.fields.common.status')}
            menuPortalTarget={document.body}
            options={taskStatusOptions}
            onChange={statusHelpers.setValue}
          />
        </div>
      </div>
      <div className='flex flex-col gap-sm'>
        <SharedTextEditor
          data-testid='task-file-description-input'
          editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
          errorMessage={touched.description && errors.description}
          label={t('common.fields.common.description')}
        />
        <SharedFormTextInput
          data-testid='task-presentation-url-input'
          isRequired={false}
          label={t('admin.tasks.presentation.label')}
          name='presentationUrl'
          type='url'
        />
      </div>

      {task && (
        <div className='flex gap-sm items-center mt-sm'>
          <SharedButton
            data-testid='admin-list-new-presentation-button'
            variant='primary'
            onClick={handlePresentationBuilderClick}>
            {taskPresentationExist
              ? t('admin.tasks.presentation.presentationBuilder')
              : t('admin.tasks.presentation.createPresentation')}
          </SharedButton>
          <StatusBadge
            className='flex flex-col items-end'
            label={t('admin.tasks.presentation.presentationStatus')}
            status={taskPresentationStatus}
            statusClassName={cx({ '!text-primary-500': taskPresentationStatus === 'PUBLISHED' })}
          />
        </div>
      )}
      <SharedFormDivider />
      <SharedTextEditor
        data-testid='task-teaching-resources-input'
        editorConfig={{ ...teachingResourcesInput, onChange: teachingResourcesHelpers.setValue }}
        errorMessage={touched.teachingResources && errors.teachingResources}
        label={t('admin.tasks.teachingResources.label')}
      />
      <SharedFormDivider />
      <SharedTextEditor
        data-testid='task-introduction-input'
        editorConfig={{ ...introductionInput, onChange: introductionHelpers.setValue }}
        errorMessage={touched.introduction && errors.introduction}
        label={t('admin.tasks.introduction.label')}
      />
      <SharedFormDivider />
      <SharedTextEditor
        data-testid='task-student-resources-input'
        editorConfig={{ ...studentResourcesInput, onChange: studentResourcesHelpers.setValue }}
        errorMessage={touched.studentResources && errors.studentResources}
        label={t('admin.tasks.studentResources.label')}
      />
      <SharedFormDivider />
      <SharedTextEditor
        data-testid='task-student-standard-input'
        editorConfig={{ ...standardInput, onChange: standardHelpers.setValue }}
        errorMessage={touched.standard && errors.standard}
        label={t('admin.tasks.standard.label')}
      />
      <SharedFormDivider />
      <div className='flex flex-col gap-sm'>
        <SharedFormTextInput
          data-testid='task-file-display-name-input'
          label={t('admin.tasks.form.filesDisplayName')}
          name='filesDisplayName'
        />
        <SharedTextEditor
          data-testid='task-file-description-input'
          editorConfig={{ ...filesDescriptionInput, onChange: filesDescriptionHelpers.setValue }}
          errorMessage={touched.filesDescription && errors.filesDescription}
          label={t('admin.tasks.form.filesDescription')}
        />
        <SharedUploadInput
          data-testid='task-files-input'
          disabled={disabledTaskFileInput}
          errorMessage={touched.files && errors.files}
          inputConfig={{ ...filesInput, onChange: filesHelpers.setValue }}
          onRemove={onTaskFileRemove}
        />
      </div>
    </>
  );
}

export default AdminTasksFormDetails;
