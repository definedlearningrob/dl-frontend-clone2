import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AdminLessonsForm from '@dc/components/Admin/Lessons/Form/Form';
import { CHECK_IN_TYPE } from '@dc/resources/constants';
import createLessonMutation from '@dc/graphql/user/mutations/createLesson';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';

import { callToast } from '@shared/components/Toaster/Toaster';

const initialValues = {
  audience: '',
  badges: [],
  checkins: [],
  goal: '',
  imageData: null,
  introduction: '',
  lessonItems: [],
  name: '',
  role: '',
  situation: '',
  type: null,
};

export const NewLesson = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    type: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const [createLesson] = useMutation(createLessonMutation);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);

  const convertValuesToLessonItems = (items) =>
    items.map((item) => ({
      itemId: item.id,
      itemType: LESSON_ITEM_TYPES[item.__typename.toUpperCase()],
      step: item.step,
    }));

  const returnToLessons = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { file } = values.imageData;

    try {
      const response =
        file && (await fileUpload(file, getPresignedUrl, RESOURCE_CLASS.LESSON, ASSET_TYPE.IMAGE));
      await response?.promise;

      const preparedCheckins = values.checkins.map((checkin) => ({
        itemId: checkin.id,
        itemType:
          checkin.__typename === 'CheckInQuestion'
            ? CHECK_IN_TYPE.CHECK_IN_QUESTION
            : CHECK_IN_TYPE.CHECK_IN_GROUP,
        step: checkin.step,
      }));

      await createLesson({
        variables: {
          input: {
            badgeIds: values.badges.map((badge) => badge.id),
            checkInItems: preparedCheckins,
            name: values.name,
            description: {
              introduction: values.introduction,
              goal: values.goal,
              role: values.role,
              audience: values.audience,
              situation: values.situation,
            },
            imageUuid: response.uuid,
            imageFilename: file.name,
            type: values.type.value,
            lessonItems: convertValuesToLessonItems(values.lessonItems),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.lessons.typeName') })
      );

      returnToLessons();
    } catch (e) {
      const errors = getFormErrors(e);
      const imageError = errors.imageUuid || errors.imageFilename;
      if (imageError) {
        errors.imageData = imageError;
      }
      setErrors(errors);
    }
  };

  return (
    <SharedMainContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <AdminLessonsForm errors={errors} title={t('admin.lessons.form.new')} touched={touched} />
        )}
      </Formik>
    </SharedMainContent>
  );
};
