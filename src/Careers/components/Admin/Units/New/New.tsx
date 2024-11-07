import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminUnitsForm from '@dc/components/Admin/Units/Form/Form';
import { CREATE_UNIT } from '@dc/graphql/user/mutations/createUnit';
import { TUnitResource } from '@dc/graphql/user/queries/unit';
import { imageDataValidationSchema } from '@dc/resources/validationSchemas';

import { callToast } from '@shared/components/Toaster/Toaster';
import { ContentStatusesTypes, SERVICE_NAME } from '@shared/resources/enums';
import { handleError } from '@shared/utils/handleError';
import { fileUploadWithPresignedUrl } from '@shared/services/aws';

export type FormValues = {
  name: string;
  description: string;
  displayName: string;
  imageData: {
    uuid?: string;
    url: string | null;
    file?: File;
    urlForUpload?: string;
  };

  unitResources: TUnitResource[];
  status: { label: string; value: ContentStatusesTypes };
  service: { label: string; value: SERVICE_NAME };
  tasks: { id: string; step: number }[];
};

function AdminUnitsNew() {
  const history = useHistory();
  const { t } = useTranslation();
  const [createUnit] = useMutation(CREATE_UNIT);

  const initialValues = {
    name: '',
    description: '',
    displayName: '',
    imageData: { url: '' },
    status: { label: t('common.publishingStatuses.draft'), value: ContentStatusesTypes.DRAFT },
    service: { label: t('common.services.learning'), value: SERVICE_NAME.LEARNING },
    tasks: [],
    unitResources: [],
  };

  const validationSchema = Yup.object().shape({
    imageData: imageDataValidationSchema,
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const returnToUnits = () => {
    history.goBack();
  };

  const handleSubmit = async (values: FormValues) => {
    const { imageData, description, displayName, name, status, service, unitResources, tasks } =
      values;

    const unitTasks = tasks.map((task) => ({ taskId: task.id, step: task.step }));

    const normalizedUnitResources = unitResources.map((resource) => ({
      resourceId: resource.resourceId,
      resourceType: resource.resourceType,
      step: resource.step,
    }));

    try {
      await createUnit({
        variables: {
          input: {
            name,
            description,
            displayName,
            imageFilename: imageData?.file?.name,
            imageUuid: imageData?.uuid,
            service: service.value,
            status: status.value,
            unitTasks,
            unitResources: normalizedUnitResources,
          },
        },
      });
      if (imageData.file && imageData.urlForUpload) {
        await fileUploadWithPresignedUrl(imageData.file, imageData.urlForUpload);
      }

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.units.typeName') })
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
      <AdminUnitsForm title={t('admin.units.form.new')} />
    </Formik>
  );
}

export default AdminUnitsNew;
