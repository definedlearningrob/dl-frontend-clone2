import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import AdminLessonsForm from '@dc/components/Admin/Lessons/Form/Form';
import { CHECK_IN_TYPE } from '@dc/resources/constants';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import lessonQuery from '@dc/graphql/user/queries/lesson';
import updateLessonMutation from '@dc/graphql/user/mutations/updateLesson';
import {
  ASSET_TYPE,
  LESSON_ITEM_TYPES,
  LESSON_TYPES,
  RESOURCE_CLASS,
} from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';
import { getLessonLabel } from '@dc/utils/lessons';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { callToast } from '@shared/components/Toaster/Toaster';

export const LessonEdit = () => {
  const [updateLesson] = useMutation(updateLessonMutation);
  const { id: lessonID } = useParams();
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    imageData: Yup.object().required(t('validation.messages.required')).nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    type: Yup.object().required(t('validation.messages.required')).nullable(),
  });

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

    const preparedCheckins = values.checkins.map((checkin) => ({
      itemId: checkin.id,
      itemType:
        checkin.__typename === 'CheckInQuestion'
          ? CHECK_IN_TYPE.CHECK_IN_QUESTION
          : CHECK_IN_TYPE.CHECK_IN_GROUP,
      step: checkin.step,
    }));

    const baseBody = {
      checkInItems: preparedCheckins,
      badgeIds: values.badges.map((badge) => badge.id),
      description: {
        introduction: values.introduction,
        goal: values.goal,
        role: values.role,
        audience: values.audience,
        situation: values.situation,
      },
      id: lessonID,
      lessonItems: convertValuesToLessonItems(values.lessonItems),
      name: values.name,
      type: values.type.value,
    };

    try {
      const response =
        file && (await fileUpload(file, getPresignedUrl, RESOURCE_CLASS.LESSON, ASSET_TYPE.IMAGE));

      await response?.promise;
      const input = file
        ? {
            ...baseBody,
            imageUuid: response.uuid,
            imageFilename: file.name,
          }
        : baseBody;

      await updateLesson({ variables: { input } });

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.lessons.typeName') })
      );

      returnToLessons();
    } catch (error) {
      const errors = getFormErrors(error);
      const imageError = errors.imageUuid || errors.imageFilename;

      if (imageError) {
        errors.imageData = imageError;
      }

      setErrors(errors);
    }
  };

  const getLessonItemValues = ({
    externalPresentations,
    vocabularies,
    texts,
    attachments,
    videos,
    assignments,
    researchLinks,
  }) =>
    [
      ...externalPresentations,
      ...vocabularies,
      ...texts,
      ...attachments,
      ...videos,
      ...assignments,
      ...researchLinks,
    ].sort((a, b) => a.step - b.step);

  const getInitialValues = ({
    lesson,
    lesson: { checkInGroups, checkInQuestions, description, name, thumbnailUrl, type, badges },
  }) => ({
    name,
    badges: badges || [],
    checkins: [...checkInGroups, ...checkInQuestions],
    introduction: description.introduction,
    goal: description.goal,
    role: description.role,
    audience: description.audience,
    situation: description.situation,
    lessonItems: getLessonItemValues(lesson),
    imageData: {
      src: thumbnailUrl,
    },
    type: {
      value: LESSON_TYPES[type.toUpperCase()],
      label: getLessonLabel(t, lesson),
    },
  });

  return (
    <SharedDataLoader
      options={{
        fetchPolicy: 'no-cache',
        variables: {
          id: lessonID,
          track: false,
        },
      }}
      query={lessonQuery}>
      {(data) => (
        <Formik
          initialValues={getInitialValues(data)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <AdminLessonsForm
              errors={errors}
              title={t('admin.lessons.form.edit')}
              touched={touched}
            />
          )}
        </Formik>
      )}
    </SharedDataLoader>
  );
};
