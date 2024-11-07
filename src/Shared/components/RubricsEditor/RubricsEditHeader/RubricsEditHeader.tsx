import { Formik, FormikHelpers, FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { GraphQLError } from 'graphql';

import { getFormErrors } from '@dc/utils/graphql';

import { TRubric } from '@pbl/graphql/user/queries/rubric';

import { RubricsEditHeaderForm } from '@shared/components/RubricsEditor/RubricsEditHeader/RubricsEditHeaderForm/RubricsEditHeaderForm';
import updateRubricMutation from '@shared/graphql/user/mutations/updateRubric';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

export type Rubric = Pick<TRubric, 'displayName' | 'id' | 'name' | 'description'>;

type Props = {
  rubric: Rubric;
};

export type RubricsEditHeaderValues = Rubric;

export const RubricsEditHeader = ({ rubric: { displayName, id, name, description } }: Props) => {
  const { t } = useTranslation();

  const [updateRubric] = useMutation(updateRubricMutation);

  const { isSystemAdmin } = useUserRole();

  const handleSubmit = async (
    values: RubricsEditHeaderValues,
    helpers: FormikHelpers<RubricsEditHeaderValues>
  ) => {
    const { name, displayName, description } = values;

    try {
      await updateRubric({
        variables: {
          input: {
            id,
            name,
            displayName,
            description,
          },
        },
      });
    } catch (error) {
      const errors = getFormErrors<FormikErrors<RubricsEditHeaderValues>>(
        error as { graphQLErrors: GraphQLError[] }
      );

      helpers.setErrors(errors);
    }
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    ...(isSystemAdmin && { displayName: Yup.string().required(t('validation.messages.required')) }),
  });

  const initialValues: RubricsEditHeaderValues = {
    displayName,
    name,
    description,
    id,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <RubricsEditHeaderForm />
    </Formik>
  );
};
