import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import updateVideoMutation from '@dc/graphql/user/mutations/updateVideo';
import VideoForm from '@dc/components/Admin/Lessons/Form/Items/Video/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsVideosEdit.propTypes = {
  video: PropTypes.object,
};

function AdminLessonItemsVideosEdit({ video }) {
  const [updateVideo] = useMutation(updateVideoMutation);
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useQueryParams();

  const { id, description, displayName, filename, name } = video;

  const returnToVideos = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

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
      returnToVideos();
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
          onCancel={returnToVideos}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsVideosEdit;
