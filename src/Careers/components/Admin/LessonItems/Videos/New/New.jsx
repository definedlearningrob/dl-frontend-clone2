import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import createVideoMutation from '@dc/graphql/user/mutations/createVideo';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import VideoForm from '@dc/components/Admin/Lessons/Form/Items/Video/Form/Form';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonItemsVideosNew() {
  const [videoProgress, setVideoProgress] = useState(null);
  const [createVideo] = useMutation(createVideoMutation);
  const { t } = useTranslation();
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    videos: Yup.array().min(1, t('validation.messages.required')),
  });

  const retrunToVideos = () => {
    history.goBack();
  };

  const handleSubmit = async ({ description, displayName, name, videos }, { setErrors } = {}) => {
    const [video] = videos;

    try {
      const response = await fileUpload(
        video,
        getPresignedUrl,
        RESOURCE_CLASS.VIDEO,
        ASSET_TYPE.VIDEO,
        setVideoProgress
      );

      await response.promise;

      await createVideo({
        variables: {
          input: {
            description,
            displayName,
            name,
            videoFilename: video.name,
            videoUuid: response.uuid,
          },
        },
      });
      setVideoProgress(null);
      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.lessons.items.video.label') })
      );
      retrunToVideos();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ description: '', displayName: '', name: '', videos: [] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <VideoForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          videoProgress={videoProgress}
          onCancel={retrunToVideos}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsVideosNew;
