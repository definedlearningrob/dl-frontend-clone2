import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import updateVideoMutation from '@dc/graphql/user/mutations/updateVideo';
import useLessonItems from '@dc/hooks/useLessonItems';
import VideoForm from '@dc/components/Admin/Lessons/Form/Items/Video/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsVideoEdit.propTypes = {
  video: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

function AdminLessonsFormItemsVideoEdit({
  video: { id, description, displayName, filename, name },
}) {
  const [updateVideo] = useMutation(updateVideoMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();
  const stubbedVideo = new Blob();
  stubbedVideo.name = filename;

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    videos: Yup.array().required(t('validation.messages.required')),
  });

  const handleSubmit = async ({ description, displayName, name }, { setErrors } = {}) => {
    try {
      await updateVideo({
        variables: {
          input: {
            id,
            description,
            displayName,
            name,
          },
        },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.lessons.items.video.label') })
      );
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ description, displayName, name, videos: [stubbedVideo] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <VideoForm
          disabledFileInput={true}
          errors={errors}
          id={id}
          submit={submitForm}
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsVideoEdit;
