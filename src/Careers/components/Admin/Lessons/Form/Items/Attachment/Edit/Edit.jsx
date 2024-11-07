import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AttachmentForm from '@dc/components/Admin/Lessons/Form/Items/Attachment/Form/Form';
import updateAttachmentMutation from '@dc/graphql/user/mutations/updateAttachment';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsAttachmentEdit.propTypes = {
  attachment: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    files: PropTypes.array,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonsFormItemsAttachmentEdit({
  attachment: { id, name, description, displayName, files },
}) {
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();
  const [updateAttachment] = useMutation(updateAttachmentMutation);
  const stubbedFiles = files.map((file) => {
    const blob = new Blob();
    blob.name = file.filename;

    return blob;
  });

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async ({ name, description, displayName }, { setErrors } = {}) => {
    try {
      await updateAttachment({
        variables: {
          input: {
            id,
            name,
            description,
            displayName,
          },
        },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', {
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
      initialValues={{ name, description, displayName, files: stubbedFiles }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <AttachmentForm
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

export default AdminLessonsFormItemsAttachmentEdit;
