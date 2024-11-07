import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { AdminCoursesForm } from '@dc/components/Admin/Courses/Form/Form';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import updateCourseMutation from '@dc/graphql/user/mutations/updateCourse';
import { ASSET_TYPE, RESOURCE_CLASS, PUBLISHING_STATUSES } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeCourse } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminCourseEdit.propTypes = {
  course: shapeCourse,
};

function AdminCourseEdit({
  course: {
    description,
    id,
    thumbnailUrl,
    lessons,
    name,
    displayName,
    badges,
    pathway,
    status,
    metadata,
    type,
    collection,
    isGlobal,
  },
}) {
  const [updateCourse] = useMutation(updateCourseMutation);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const { t } = useTranslation();
  const history = useHistory();

  const courseStatuses = {
    DRAFT: { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    PUBLISHED: {
      value: PUBLISHING_STATUSES.PUBLISHED,
      label: t('common.publishingStatuses.published'),
    },
  };

  const validationSchema = Yup.object().shape({
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { file } = values.imageData;

    const baseBody = {
      id: id,
      badgeIds: values.badges.map(({ id }) => id),
      description: values.description,
      name: values.name,
      displayName: values.displayName,
      pathwayId: values.pathway?.id,
      status: values.status.value,
      courseLessons: values.lessons.map(({ id, step }) => ({ lessonId: id, step })),
      type: values.type,
      collectionId: values.collection.value,
      isGlobal: values.isGlobal,
      metadata: {
        averageSalary: values.averageSalary,
        outlook: values.outlook,
        alternativeTitles: values.alternativeTitles,
        onetCode: values.onetCode,
        jobZone: parseInt(values.jobZone),
      },
    };

    try {
      const response =
        file && (await fileUpload(file, getPresignedUrl, RESOURCE_CLASS.COURSE, ASSET_TYPE.IMAGE));
      await response?.promise;

      const input = file
        ? {
            ...baseBody,
            imageUuid: response.uuid,
            imageFilename: file.name,
          }
        : baseBody;

      await updateCourse({
        variables: { input },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.courses.typeName') })
      );

      history.goBack();
    } catch (error) {
      const errors = getFormErrors(error);
      const imageError = errors.imageUuid || errors.imageFilename;

      if (imageError) {
        errors.imageData = imageError;
      }

      setErrors(errors);
    }
  };

  const initialValues = {
    name,
    displayName,
    averageSalary: metadata.averageSalary,
    badges: badges || [],
    outlook: metadata.outlook,
    alternativeTitles: metadata.alternativeTitles,
    onetCode: metadata.onetCode,
    jobZone: metadata.jobZone,
    description,
    lessons,
    imageData: {
      src: thumbnailUrl,
    },
    isGlobal: isGlobal,
    pathway: pathway
      ? {
          id: pathway.id,
          value: pathway.name,
          label: pathway.name,
        }
      : null,
    status: {
      value: courseStatuses[status.toUpperCase()].value,
      label: courseStatuses[status.toUpperCase()].label,
    },
    type,
    collection: {
      value: collection.id,
      label: collection.name,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminCoursesForm
          errors={errors}
          id={id}
          title={t('admin.courses.form.edit')}
          touched={touched}
        />
      )}
    </Formik>
  );
}

export default AdminCourseEdit;
