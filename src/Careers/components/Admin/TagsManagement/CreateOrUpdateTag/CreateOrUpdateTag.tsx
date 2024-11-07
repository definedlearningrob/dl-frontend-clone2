import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { ApolloError } from '@apollo/client';

import { TagForm } from '@dc/components/Admin/TagsManagement/TagForm/TagForm';
import { useTagQuery } from '@dc/graphql/user/hooks/useTagQuery';
import { useCreateTag } from '@dc/graphql/user/hooks/useCreateTag';
import { useUpdateTag } from '@dc/graphql/user/hooks/useUpdateTag';

type TagFormValues = { name: string; isDefault: boolean };

export const CreateOrUpdateTag = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data } = useTagQuery({ id, skip: !id });
  const history = useHistory();
  const { updateTag } = useUpdateTag();
  const { createTag } = useCreateTag();

  const initialValues = {
    name: data?.tag.name || '',
    isDefault: data?.tag.isDefault || false,
  };
  const validationSchema = Yup.object().shape({
    isDefault: Yup.boolean(),
    name: Yup.string().required(t('validation.messages.required')),
  });
  const handleSubmit = async ({ name, isDefault = false }: TagFormValues) => {
    let error: ApolloError | unknown;

    if (id) {
      error = await updateTag({ id, name, isDefault });
    } else {
      const { error: err } = await createTag({ name, isDefault });
      error = err;
    }

    if (isEmpty(error)) {
      history.push('/admin/performance-indicators');
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <TagForm />
    </Formik>
  );
};
