import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminCatalogsForm from '@dc/components/Admin/Catalogs/Form/Form';
import createCatalogMutation from '@dc/graphql/user/mutations/createCatalog';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import { SERVICE_NAME } from '@shared/resources/enums';

function AdminCatalogsNew() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    imageData: Yup.object()
      .shape({
        uuid: Yup.string().required(t('validation.messages.required')).nullable(),
      })
      .required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const [createCatalog] = useMutation(createCatalogMutation);

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await createCatalog({
        variables: {
          input: {
            name: values.name,
            displayName: values.displayName,
            description: values.description,
            imageUuid: values.imageData.uuid,
            imageFilename: values.imageData.filename,
            status: values.status.value,
            service: values.service.value,
            catalogTracks: values.tracks.map(({ id, step }) => ({ trackId: id, step })),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.catalogs.typeName') })
      );

      history.goBack();
    } catch (e) {
      const errors = getFormErrors(e);
      const imageError = errors.imageUuid || errors.imageFilename;
      if (imageError) {
        errors.imageData = imageError;
      }
      setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    displayName: '',
    imageData: {
      uuid: '',
      filename: '',
      url: '',
      file: null,
    },
    tracks: [],
    service: { label: 'Learning', value: SERVICE_NAME.LEARNING },
    status: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminCatalogsForm errors={errors} title={t('admin.catalogs.form.new')} touched={touched} />
      )}
    </Formik>
  );
}

export default AdminCatalogsNew;
