import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { AdminProductsForm } from '@dc/components/Admin/Products/Form/Form';
import createProductMutation from '@dc/graphql/user/mutations/createProduct';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

export const AdminProductsNew = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [createProduct] = useMutation(createProductMutation);
  const initialValues = {
    badges: [],
    name: '',
    description: '',
    displayName: '',
    rubrics: [],
    rubricsUrl: '',
    status: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
    rubricsUrl: Yup.string().url(),
    status: Yup.object().required(t('validation.messages.required')).nullable(),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { badges, description, displayName, name, rubrics, rubricsUrl, status } = values;
    try {
      await createProduct({
        variables: {
          input: {
            badgeIds: badges.map((badge) => badge.id),
            description,
            displayName,
            name,
            status: status.value,
            rubricIds: rubrics.map((rubric) => rubric.id),
            rubricsUrl,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.products.typeName') })
      );

      history.goBack();
    } catch (error) {
      const errors = getFormErrors(error);

      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminProductsForm errors={errors} title={t('admin.products.form.new')} touched={touched} />
      )}
    </Formik>
  );
};
