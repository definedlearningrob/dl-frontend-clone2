import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminUnitsForm from '@dc/components/Admin/Units/Form/Form';
import { UNIT_UPDATE } from '@dc/graphql/user/mutations/updateUnit';
import { TUnit } from '@dc/graphql/user/queries/unit';
import { FormValues } from '@dc/components/Admin/Units/New/New';
import { imageDataValidationSchema } from '@dc/resources/validationSchemas';

import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';
import { ContentStatusesTypes } from '@shared/resources/enums';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

type Props = {
  unit: TUnit;
};

function AdminUnitsEdit({
  unit: { description, displayName, id, name, service, status, tasks, thumbnailUrl, resources },
}: Props) {
  const history = useHistory();
  const { t } = useTranslation();
  const [updateUnit] = useMutation(UNIT_UPDATE);

  const unitStatusLabels = {
    [ContentStatusesTypes.DRAFT]: t('common.publishingStatuses.draft'),
    [ContentStatusesTypes.ARCHIVED]: t('common.publishingStatuses.archived'),
    [ContentStatusesTypes.PUBLISHED]: t('common.publishingStatuses.published'),
  } as const;

  const initialValues = {
    name,
    description,
    displayName,
    imageData: {
      url: thumbnailUrl,
    },
    service: {
      value: service,
      label: t(`common.services.${service.toLowerCase()}`),
    },
    status: {
      value: status,
      label: unitStatusLabels[status],
    },
    unitResources: resources.map((resource) => ({
      ...resource,
      id: resource.resourceId,
      thumbnailUrl: resource.thumbnailUrl || 'fallback',
    })),
    tasks,
  };

  const validationSchema = Yup.object().shape({
    imageData: imageDataValidationSchema,
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')),
  });

  const returnToUnits = () => {
    history.goBack();
  };

  const handleSubmit = async (values: FormValues) => {
    const { imageData, description, displayName, name, status, tasks, unitResources } = values;

    const unitTasks = tasks.map((task) => ({ taskId: task.id, step: task.step }));

    const normalizedUnitResources = unitResources.map((resource, index) => ({
      resourceId: resource.resourceId,
      resourceType: resource.resourceType,
      step: index + 1,
    }));

    const baseBody = {
      id,
      description,
      displayName,
      name,
      status: status.value,
      unitTasks,
      unitResources: normalizedUnitResources,
    };

    const isFileAdded = imageData.uuid && imageData.file?.name;
    const updatedImage = {
      imageUuid: imageData?.uuid,
      imageFilename: imageData?.file?.name,
    };

    const input = {
      ...baseBody,
      ...(isFileAdded && updatedImage),
    };

    try {
      await updateUnit({ variables: { input } });
      if (imageData.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.units.typeName') })
      );
      returnToUnits();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <AdminUnitsForm id={id} title={t('admin.units.form.edit')} />
    </Formik>
  );
}

export default AdminUnitsEdit;
