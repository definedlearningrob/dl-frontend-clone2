import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { AdminTasksForm } from '@dc/components/Admin/Tasks/Form/Form';
import { CHECK_IN_TYPE } from '@dc/resources/constants';
import { CREATE_TASK_FILE } from '@dc/graphql/user/mutations/createTaskFile';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import updateTaskMutation from '@dc/graphql/user/mutations/updateTask';
import updateTaskFileMutation from '@dc/graphql/user/mutations/updateTaskFile';
import { ASSET_TYPE, PUBLISHING_STATUSES, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { formatFormikInitialValues } from '@dc/utils/formik';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeTask } from '@dc/resources/typeDefs';

import { DELETE_TASK_FILE } from '@shared/graphql/user/mutations/deleteTaskFile';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminTasksEdit.propTypes = {
  task: shapeTask,
};

function AdminTasksEdit({ task }) {
  const {
    badges,
    checkInGroups,
    courses,
    checkInQuestions,
    description,
    displayName,
    files,
    id,
    introduction,
    name,
    presentationUrl,
    pathways,
    products,
    standard,
    status,
    studentResources,
    teachingResources,
    thumbnailUrl,
  } = task;

  const history = useHistory();
  const { t } = useTranslation();
  const [createTaskFile] = useMutation(CREATE_TASK_FILE);
  const [deleteTaskFile, { loading }] = useMutation(DELETE_TASK_FILE);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const [taskFilesToArchive, setTaskFilesToArchive] = useState([]);
  const [updateTask] = useMutation(updateTaskMutation);
  const [updateTaskFile] = useMutation(updateTaskFileMutation);

  const taskStatuses = {
    DRAFT: { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    PUBLISHED: {
      value: PUBLISHING_STATUSES.PUBLISHED,
      label: t('common.publishingStatuses.published'),
    },
  };

  const validationSchema = Yup.object().shape({
    courses: Yup.array().max(3),
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    presentationUrl: Yup.string().url(),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const stubbedFiles = files.map((file) => {
    const blob = new Blob();

    blob.id = file.id;
    blob.name = file.filename;
    blob.step = file.step;

    return blob;
  });

  const initialValues = formatFormikInitialValues({
    badges: badges || [],
    checkins: [...checkInGroups, ...checkInQuestions],
    courses,
    description,
    displayName,
    files: stubbedFiles,
    filesDescription: files[0]?.description,
    filesDisplayName: files[0]?.displayName,
    introduction,
    pathwayOptions: pathways.map((pathway) => ({ label: pathway.name, value: pathway })),
    name,
    imageData: {
      src: thumbnailUrl,
    },
    presentationUrl,
    products,
    standard,
    status: {
      value: taskStatuses[status.toUpperCase()].value,
      label: taskStatuses[status.toUpperCase()].label,
    },
    studentResources,
    teachingResources,
  });

  const returnToTasks = () => history.goBack();

  const archiveTaskFiles = () => {
    const archiveFiles = taskFilesToArchive.filter((file) => file.id);

    return Promise.all(
      archiveFiles.map((file) =>
        deleteTaskFile({
          variables: {
            input: {
              id: file.id,
            },
          },
        })
      )
    );
  };

  const updateTaskFiles = (files, description, displayName) => {
    const filesToUpdate = files.filter((file) => file.id);

    return Promise.all(
      filesToUpdate.map((file) =>
        updateTaskFile({
          variables: {
            input: {
              description,
              displayName,
              id: file.id,
              name,
            },
          },
        })
      )
    );
  };

  const createTaskFiles = async (description, displayName, files) => {
    const creatableFiles = files.filter((file) => !file.id);
    const responses = await Promise.all(
      creatableFiles.map((file) =>
        fileUpload(file, getPresignedUrl, RESOURCE_CLASS.TASK_FILE, ASSET_TYPE.FILE)
      )
    );

    await Promise.all(responses.map(({ promise }) => promise));
    let stepCounter = initialValues.files.length > 0 ? initialValues.files.at(-1).step + 1 : 0;

    return Promise.all(
      responses.map((response) => {
        createTaskFile({
          variables: {
            input: {
              description,
              displayName,
              fileFilename: response.file.name,
              fileUuid: response.uuid,
              name,
              step: stepCounter,
              taskId: id,
            },
          },
        });
        stepCounter += 1;
      })
    );
  };

  const onTaskFileRemove = (file) => {
    setTaskFilesToArchive([...taskFilesToArchive, file]);
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const {
      badges,
      checkins,
      courses,
      description,
      displayName,
      filesDescription,
      filesDisplayName,
      files,
      imageData,
      introduction,
      pathwayOptions,
      name,
      presentationUrl,
      products,
      standard,
      status,
      studentResources,
      teachingResources,
    } = values;

    const preparedCheckins = checkins.map((checkin) => ({
      itemId: checkin.id,
      itemType:
        checkin.__typename === 'CheckInQuestion'
          ? CHECK_IN_TYPE.CHECK_IN_QUESTION
          : CHECK_IN_TYPE.CHECK_IN_GROUP,
      step: checkin.step,
    }));

    const baseTaskBody = {
      badgeIds: badges.map(({ id }) => id),
      checkInItems: preparedCheckins,
      courseIds: courses.map(({ id }) => id),
      description,
      displayName,
      id,
      introduction,
      name,
      presentationUrl,
      pathwayIds: pathwayOptions.map((pathway) => pathway.value.id),
      standard,
      status: status.value,
      studentResources,
      teachingResources,
      taskProducts: products.map(({ id: productId, step }) => ({ productId, step })),
    };

    try {
      await Promise.all([
        archiveTaskFiles(),
        createTaskFiles(filesDescription, filesDisplayName, files),
      ]);

      const { file: imageFile } = imageData;

      const imageResponse =
        imageFile &&
        (await fileUpload(imageFile, getPresignedUrl, RESOURCE_CLASS.TASK, ASSET_TYPE.IMAGE));

      await imageResponse?.promise;

      const input = imageFile
        ? {
            ...baseTaskBody,
            imageUuid: imageResponse.uuid,
            imageFilename: imageFile.name,
          }
        : baseTaskBody;

      await updateTask({ variables: { input } });

      await updateTaskFiles(files, filesDescription, filesDisplayName);

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.tasks.typeName') })
      );

      returnToTasks();
    } catch (error) {
      const errors = getFormErrors(error);

      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminTasksForm
          disabledTaskFileInput={loading}
          errors={errors}
          id={id}
          task={task}
          title={t('admin.tasks.form.edit')}
          touched={touched}
          onTaskFileRemove={onTaskFileRemove}
        />
      )}
    </Formik>
  );
}

export default AdminTasksEdit;
