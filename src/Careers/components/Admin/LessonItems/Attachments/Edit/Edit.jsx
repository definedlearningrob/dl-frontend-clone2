import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import archiveAttachmentFileMutation from '@dc/graphql/user/mutations/archiveAttachmentFile';
import AttachmentForm from '@dc/components/Admin/Lessons/Form/Items/Attachment/Form/Form';
import createAttachmentFileMutation from '@dc/graphql/user/mutations/createAttachmentFile';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import updateAttachmentMutation from '@dc/graphql/user/mutations/updateAttachment';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsAttachmentsEdit.propTypes = {
  attachment: PropTypes.object,
};

function AdminLessonItemsAttachmentsEdit({ attachment }) {
  const { t } = useTranslation();
  const [createAttachmentFile] = useMutation(createAttachmentFileMutation);
  const [updateAttachment] = useMutation(updateAttachmentMutation);
  const [archiveAttachmentFile, { loading }] = useMutation(archiveAttachmentFileMutation);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const [filesToArchive, setFilesToArchive] = useState([]);
  const history = useHistory();
  const { description, displayName, files, name, id } = attachment;
  const { params } = useQueryParams();

  const stubbedFiles = files.map((file) => {
    const blob = new Blob();
    blob.name = file.filename;
    blob.id = file.id;

    return blob;
  });

  const returnToAttachments = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const archiveFiles = () => {
    const archivableFiles = filesToArchive.filter((file) => file.id);

    return Promise.all(
      archivableFiles.map((file) =>
        archiveAttachmentFile({
          variables: {
            input: {
              id: file.id,
            },
          },
        })
      )
    );
  };

  const createFiles = async (files) => {
    const creatableFiles = files.filter((file) => !file.id);
    const responses = await Promise.all(
      creatableFiles.map((file) =>
        fileUpload(file, getPresignedUrl, RESOURCE_CLASS.ATTACHMENT, ASSET_TYPE.FILE)
      )
    );
    await Promise.all(responses.map(({ promise }) => promise));

    return Promise.all(
      responses.map((response) =>
        createAttachmentFile({
          variables: {
            input: {
              fileFilename: response.file.name,
              fileUuid: response.uuid,
              attachmentId: id,
            },
          },
        })
      )
    );
  };

  const handleSubmit = async ({ files, name, description, displayName }, { setErrors } = {}) => {
    try {
      await Promise.all([archiveFiles(), createFiles(files)]);
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
      returnToAttachments();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const onFileRemove = (file) => {
    setFilesToArchive([...filesToArchive, file]);
  };

  return (
    <Formik
      disabledFileInput={loading}
      initialValues={{ name, description, displayName, files: stubbedFiles }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <AttachmentForm
          errors={errors}
          id={id}
          submit={submitForm}
          touched={touched}
          onCancel={returnToAttachments}
          onFileRemove={onFileRemove}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsAttachmentsEdit;
