import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AdminTracksForm from '@dc/components/Admin/Tracks/Form/Form';
import createTrackMutation from '@dc/graphql/user/mutations/createTrack';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import { SERVICE_NAME } from '@shared/resources/enums';

function AdminTracksNew() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    imageData: Yup.object()
      .shape({
        uuid: Yup.string().required(t('validation.messages.required')),
      })
      .required(t('validation.messages.required'))
      .nullable(),
    name: Yup.string().required(t('validation.messages.required')),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const [createTrack] = useMutation(createTrackMutation);

  const returnToTracks = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const {
      description,
      displayName,
      grades,
      imageData,
      name,
      shortDescription,
      status,
      units,
      service,
    } = values;
    try {
      await createTrack({
        variables: {
          input: {
            description: description,
            displayName: displayName,
            grades: [...grades.map(({ value }) => value)],
            imageFilename: imageData.file.name,
            imageUuid: imageData.uuid,
            name: name,
            shortDescription: shortDescription,
            status: status.value,
            service: service.value,
            trackUnits: units.map(({ id: unitId, step }) => ({ unitId, step })),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.tracks.typeName') })
      );

      returnToTracks();
    } catch (error) {
      const errors = getFormErrors(error);
      const imageError = errors.imageUuid || errors.imageFilename;
      if (imageError) {
        errors.imageData = imageError;
      }
      setErrors(errors);
    }
  };

  const initialValues = {
    description: '',
    displayName: '',
    grades: [],
    imageData: {
      uuid: '',
      filename: null,
      url: '',
      file: null,
    },
    name: '',
    shortDescription: '',
    status: null,
    service: { label: t('common.services.learning'), value: SERVICE_NAME.LEARNING },
    units: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminTracksForm errors={errors} title={t('admin.tracks.form.new')} touched={touched} />
      )}
    </Formik>
  );
}

export default AdminTracksNew;
