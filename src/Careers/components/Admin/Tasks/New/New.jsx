import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { AdminTasksForm } from '@dc/components/Admin/Tasks/Form/Form';
import { CHECK_IN_TYPE } from '@dc/resources/constants';
import { CREATE_TASK_FILE } from '@dc/graphql/user/mutations/createTaskFile';
import createTaskMutation from '@dc/graphql/user/mutations/createTask';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminTasksNew() {
  const history = useHistory();
  const { t } = useTranslation();
  const [createTask] = useMutation(createTaskMutation);
  const [createTaskFile] = useMutation(CREATE_TASK_FILE);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);

  const validationSchema = Yup.object().shape({
    courses: Yup.array().max(3, t('validation.messages.exceededMaxCourses', { max: 3 })),
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    presentationUrl: Yup.string().url(),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const initialValues = {
    badges: [],
    checkins: [],
    description: '',
    displayName: '',
    files: [],
    imageData: null,
    introduction: '',
    name: '',
    pathwayOptions: [],
    presentationUrl: '',
    standard: '',
    status: null,
    studentResources: '',
    teachingResources: '',
    products: [],
    courses: [],
    pathways: [],
  };

  const returnToTasks = () => history.goBack();

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { file: imageFile } = values.imageData;

    const {
      badges,
      checkins,
      courses,
      description,
      displayName,
      files,
      filesDescription,
      filesDisplayName,
      introduction,
      name,
      presentationUrl,
      products,
      pathwayOptions,
      standard,
      status,
      studentResources,
      teachingResources,
    } = values;

    const courseIds = courses.map(({ id }) => id);

    const imageResponse =
      imageFile &&
      (await fileUpload(imageFile, getPresignedUrl, RESOURCE_CLASS.TASK, ASSET_TYPE.IMAGE));
    await imageResponse?.promise;

    const responses = await Promise.all(
      values.files.map((file) =>
        fileUpload(file, getPresignedUrl, RESOURCE_CLASS.TASK_FILE, ASSET_TYPE.FILE)
      )
    );

    await Promise.all(responses.map(({ promise }) => promise));

    const preparedCheckins = checkins.map((checkin) => ({
      itemId: checkin.id,
      itemType:
        checkin.__typename === 'CheckInQuestion'
          ? CHECK_IN_TYPE.CHECK_IN_QUESTION
          : CHECK_IN_TYPE.CHECK_IN_GROUP,
      step: checkin.step,
    }));

    try {
      const { data } = await createTask({
        variables: {
          input: {
            badgeIds: badges.map(({ id }) => id),
            checkInItems: preparedCheckins,
            courseIds,
            description,
            displayName,
            introduction,
            imageUuid: imageResponse.uuid,
            imageFilename: imageFile.name,
            name,
            pathwayIds: pathwayOptions.map((pathway) => pathway.value.id),
            presentationUrl,
            standard,
            status: status.value,
            studentResources,
            taskProducts: products.map(({ id: productId, step }) => ({ productId, step })),
            teachingResources,
          },
        },
      });

      const { task } = data.createTask;

      await Promise.all(
        responses.map((response) =>
          createTaskFile({
            variables: {
              input: {
                description: filesDescription,
                displayName: filesDisplayName,
                fileFilename: response.file.name,
                fileUuid: response.uuid,
                name,
                step: files.findIndex((file) => file.name === response.file.name),
                taskId: task.id,
              },
            },
          })
        )
      );

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.tasks.typeName') })
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
        <AdminTasksForm errors={errors} title={t('admin.tasks.form.new')} touched={touched} />
      )}
    </Formik>
  );
}

export default AdminTasksNew;
