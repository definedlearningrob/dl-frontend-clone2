import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AttachmentForm from '@dc/components/Admin/Lessons/Form/Items/Attachment/Form/Form';
import createAttachmentMutation from '@dc/graphql/user/mutations/createAttachment';
import createAttachmentFileMutation from '@dc/graphql/user/mutations/createAttachmentFile';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import useLessonItems from '@dc/hooks/useLessonItems';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonsFormItemsAttachmentNew() {
  const { addItem, closeForm, refetchQuery } = useLessonItems();
  const { t } = useTranslation();
  const [createAttachment] = useMutation(createAttachmentMutation);
  const [createAttachmentFile] = useMutation(createAttachmentFileMutation);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async ({ name, description, displayName, files }, { setErrors } = {}) => {
    const responses = await Promise.all(
      files.map((file) =>
        fileUpload(file, getPresignedUrl, RESOURCE_CLASS.ATTACHMENT, ASSET_TYPE.FILE)
      )
    );
    await Promise.all(responses.map(({ promise }) => promise));

    try {
      const { data } = await createAttachment({
        variables: {
          input: {
            name,
            description,
            displayName,
          },
        },
        refetchQueries: [refetchQuery],
      });

      const { attachment } = data.createAttachment;

      await Promise.all(
        responses.map((response) =>
          createAttachmentFile({
            variables: {
              input: {
                fileFilename: response.file.name,
                fileUuid: response.uuid,
                attachmentId: attachment.id,
              },
            },
          })
        )
      );
      addItem(data.createAttachment.attachment);
      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.lessons.items.attachment.label'),
        })
      );
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', description: '', displayName: '', files: [] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <AttachmentForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsAttachmentNew;
