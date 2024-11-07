import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminTracksForm from '@dc/components/Admin/Tracks/Form/Form';
import updateTrackMutation from '@dc/graphql/user/mutations/updateTrack';
import { PUBLISHING_STATUSES, TRACK_GRADES } from '@dc/resources/constants';
import { formatFormikInitialValues } from '@dc/utils/formik';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeTrack } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminTracksEdit.propTypes = {
  track: shapeTrack,
};

function AdminTracksEdit({
  track: {
    description,
    displayName,
    grades,
    id,
    name,
    shortDescription,
    status,
    service,
    imageUrl,
    thumbnailUrl,
    units,
  },
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const [updateTrack] = useMutation(updateTrackMutation);
  const sortedGrades = [...grades].sort((first, second) =>
    first.localeCompare(second, undefined, { numeric: true })
  );
  const trackStatuses = {
    DRAFT: { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
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

  const returnToTracks = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const baseBody = {
      description: values.description,
      displayName: values.displayName,
      grades: [...values.grades.map((grade) => grade.value)],
      id,
      name: values.name,
      shortDescription: values.shortDescription,
      status: values.status.value,
      trackUnits: values.units.map(({ id: unitId, step }) => ({ unitId, step })),
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

      await updateTrack({ variables: { input } });

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.tracks.typeName') })
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

  const initialValues = formatFormikInitialValues({
    description,
    displayName,
    grades: [
      ...sortedGrades.map((grade) => TRACK_GRADES.find((trackGrade) => trackGrade.value === grade)),
    ],
    imageData: {
      uuid: '',
      filename: null,
      url: imageUrl || thumbnailUrl || '',
      file: null,
    },
    name,
    shortDescription,
    status: {
      value: trackStatuses[status.toUpperCase()].value,
      label: trackStatuses[status.toUpperCase()].label,
    },
    service: {
      value: service,
      label: t(`common.services.${service.toLowerCase()}`),
    },
    units,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminTracksForm
          errors={errors}
          id={id}
          title={t('admin.tracks.form.edit')}
          touched={touched}
        />
      )}
    </Formik>
  );
}

export default AdminTracksEdit;
