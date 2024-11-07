import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BadgeForm } from '@dc/components/Admin/BadgeManagement/BadgeForm/BadgeForm';
import { useCreateBadge } from '@dc/graphql/user/hooks/useCreateBadge';
import { CreateEditSkeleton } from '@dc/components/Admin/BadgeManagement/BadgeSkeletons/CreateEditSkeleton';
import { useUpdateBadge } from '@dc/graphql/user/hooks/useUpdateBadge';
import { useBadgeQuery } from '@dc/graphql/user/hooks/useBadgeQuery';
import { imageDataValidationSchema } from '@dc/resources/validationSchemas';

import { callToast } from '@shared/components/Toaster/Toaster';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

export type BadgeFormValues = {
  name: string;
  description: string;
  imageData: {
    file?: File;
    url?: string;
    urlForUpload?: string;
    uuid?: string;
    filename?: string;
  };
};

export const CreateOrUpdateBadge = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { updateBadge } = useUpdateBadge();
  const { createBadge } = useCreateBadge();
  const { data, loading } = useBadgeQuery({ id, skip: !id });

  const history = useHistory();

  if (loading) {
    return <CreateEditSkeleton />;
  }

  const initialValues = {
    name: data?.badge.name || '',
    imageData: { url: data?.badge.thumbnailUrl },
    description: data?.badge.description || '',
  };

  const validationSchema = Yup.object({
    description: Yup.string().required(t('validation.messages.required')),
    imageData: imageDataValidationSchema,
    name: Yup.string()
      .required(t('validation.messages.required'))
      .min(3, t('validation.messages.minLength', { min: 3 })),
  });

  const handleOnSubmit = async (values: BadgeFormValues) => {
    const { imageData, name, description } = values;

    if (!imageData) {
      return;
    }

    const isFileAdded = imageData.uuid && imageData.filename;
    const badgeToUpdate = {
      id,
      name,
      description,
      ...(isFileAdded && {
        imageUuid: imageData.uuid,
        imageFilename: imageData.filename,
      }),
    };

    try {
      const createOrUpdateBadge = id ? updateBadge : createBadge;
      await createOrUpdateBadge(badgeToUpdate);
      if (imageData.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      history.push('/admin/badges');
    } catch (e) {
      callToast('error', 'Error', t('admin.badges.badgeCreatedError'));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}>
      <BadgeForm />
    </Formik>
  );
};
