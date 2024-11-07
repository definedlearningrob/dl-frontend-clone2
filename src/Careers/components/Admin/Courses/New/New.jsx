import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import createCourseMutation from '@dc/graphql/user/mutations/createCourse';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import { AdminCoursesForm } from '@dc/components/Admin/Courses/Form/Form';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { COURSE_TYPES } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminCoursesNew.propTypes = {
  surveyLesson: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};

function AdminCoursesNew({ surveyLesson }) {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
    type: Yup.string().required(t('validation.messages.required')),
  });

  const [createCourse] = useMutation(createCourseMutation);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { file } = values.imageData;

    try {
      const response =
        file && (await fileUpload(file, getPresignedUrl, RESOURCE_CLASS.COURSE, ASSET_TYPE.IMAGE));
      await response?.promise;

      await createCourse({
        variables: {
          input: {
            metadata: {
              averageSalary: values.averageSalary,
              outlook: values.outlook,
              alternativeTitles: values.alternativeTitles,
              onetCode: values.onetCode,
              jobZone: parseInt(values.jobZone),
            },
            badgeIds: values.badges.map(({ id }) => id),
            name: values.name,
            description: values.description,
            imageUuid: response.uuid,
            imageFilename: file.name,
            pathwayId: values.pathway?.id,
            status: values.status.value,
            type: values.type,
            courseLessons: values.lessons.map(({ id, step }) => ({ lessonId: id, step })),
            collectionId: values.collection.value,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.courses.typeName') })
      );

      history.goBack();
    } catch (e) {
      const errors = getFormErrors(e);
      const imageError = errors.imageUuid || errors.imageFilename;
      if (imageError) {
        errors.imageData = imageError;
      }
      setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    badges: [],
    description: '',
    averageSalary: '',
    outlook: '',
    alternativeTitles: '',
    onetCode: '',
    jobZone: '',
    imageData: null,
    pathway: null,
    lessons: [{ ...surveyLesson, step: 1 }],
    status: null,
    type: COURSE_TYPES.HIGH_SCHOOL,
    collection: { label: 'Career', value: '1' },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminCoursesForm errors={errors} title={t('admin.courses.form.new')} touched={touched} />
      )}
    </Formik>
  );
}

export default AdminCoursesNew;
