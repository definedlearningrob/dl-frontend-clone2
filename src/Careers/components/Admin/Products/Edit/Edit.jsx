import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { AdminProductsForm } from '@dc/components/Admin/Products/Form/Form';
import updateProductMutation from '@dc/graphql/user/mutations/updateProduct';
import { getFormErrors } from '@dc/utils/graphql';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { shapeProduct } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminProductsEdit.propTypes = {
  product: shapeProduct,
};

function AdminProductsEdit({
  product: { badges, description, displayName, id, rubrics, rubricsUrl, name, status },
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const [updateProduct] = useMutation(updateProductMutation);

  const productStatuses = {
    DRAFT: { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    PUBLISHED: {
      value: PUBLISHING_STATUSES.PUBLISHED,
      label: t('common.publishingStatuses.published'),
    },
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
    rubricsUrl: Yup.string().url(),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { badges, description, displayName, name, rubrics, rubricsUrl, status } = values;
    try {
      await updateProduct({
        variables: {
          input: {
            badgeIds: badges.map((badge) => badge.id),
            description,
            displayName,
            id,
            name,
            status: status.value,
            rubricIds: rubrics.map((rubric) => rubric.id),
            rubricsUrl,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.products.typeName') })
      );

      history.goBack();
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
    badges,
    name,
    description,
    displayName,
    rubrics,
    rubricsUrl,
    status: {
      value: productStatuses[status.toUpperCase()].value,
      label: productStatuses[status.toUpperCase()].label,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminProductsForm
          errors={errors}
          id={id}
          title={t('admin.products.form.edit')}
          touched={touched}
        />
      )}
    </Formik>
  );
}

export default AdminProductsEdit;
