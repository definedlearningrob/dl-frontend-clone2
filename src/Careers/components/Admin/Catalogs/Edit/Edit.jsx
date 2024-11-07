import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminCatalogsForm from '@dc/components/Admin/Catalogs/Form/Form';
import updateCatalogMutation from '@dc/graphql/user/mutations/updateCatalog';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeCatalog } from '@dc/resources/typeDefs';
import { formatFormikInitialValues } from '@dc/utils/formik';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminCatalogsEdit.propTypes = {
  catalog: shapeCatalog,
};

function AdminCatalogsEdit({
  catalog: { description, displayName, id, name, status, thumbnailUrl, tracks, service },
}) {
  const [updateCatalog] = useMutation(updateCatalogMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const catalogStatuses = {
    DRAFT: {
      value: PUBLISHING_STATUSES.DRAFT,
      label: t('common.publishingStatuses.draft'),
    },
    PUBLISHED: {
      value: PUBLISHING_STATUSES.PUBLISHED,
      label: t('common.publishingStatuses.published'),
    },
  };

  const validationSchema = Yup.object().shape({
    imageData: Yup.object()
      .shape({
        url: Yup.string().required(t('validation.messages.required')).nullable(),
      })
      .required(t('validation.messages.required'))
      .nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const baseBody = {
      id: id,
      description: values.description,
      displayName: values.displayName,
      name: values.name,
      status: values.status.value,
      catalogTracks: values.tracks.map(({ id, step }) => ({
        trackId: id,
        step,
      })),
    };

    const hasNewImage = !!values.imageData.uuid;
    const imageData = {
      imageUuid: values.imageData.uuid,
      imageFilename: values.imageData.filename,
    };
    const payload = {
      ...baseBody,
      ...(hasNewImage && imageData),
    };

    try {
      const input = payload;

      await updateCatalog({ variables: { input } });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.catalogs.typeName'),
        })
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

  const initialValues = formatFormikInitialValues({
    name,
    description,
    displayName,
    tracks,
    imageData: {
      uuid: null,
      filename: null,
      url: thumbnailUrl,
      file: null,
    },
    status: {
      value: catalogStatuses[status.toUpperCase()].value,
      label: catalogStatuses[status.toUpperCase()].label,
    },
    service: {
      value: service,
      label: t(`common.services.${service.toLowerCase()}`),
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminCatalogsForm
          errors={errors}
          id={id}
          title={t('admin.catalogs.form.edit')}
          touched={touched}
        />
      )}
    </Formik>
  );
}

export default AdminCatalogsEdit;
