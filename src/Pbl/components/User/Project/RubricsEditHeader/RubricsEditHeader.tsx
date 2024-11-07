import { t } from 'i18next';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

import updateRubricMutation from '@shared/graphql/user/mutations/updateRubric';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { getFormErrors } from '@shared/utils/graphql';
import { ReactComponent as Edit } from '@shared/svg/edit.svg';
import { useToggle } from '@shared/hooks/useToggle';

import { RubricsHeaderForm } from './RubricsHeaderForm';

type Props = {
  displayName: string;
  id: string;
  name: string;
};

type FormValues = {
  displayName: string;
  name: string;
};

const validationSchema = Yup.object().shape({
  displayName: Yup.string(),
  name: Yup.string().required(t('validation.messages.required')),
});

export const RubricsEditHeader = ({ displayName, id, name }: Props) => {
  const [isEditing, , openForm, closeForm] = useToggle(false);

  const [updateRubric] = useMutation(updateRubricMutation);

  const initialValues = {
    displayName,
    name,
  };

  const handleSubmit = async (
    { displayName, name }: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateRubric({
        variables: {
          input: {
            id,
            name,
            displayName,
          },
        },
      });
      closeForm();
    } catch (error) {
      //@ts-ignore
      const errors = getFormErrors<FormValues>(error);
      setErrors(errors);
    }
  };

  return (
    <div className='rubrics-builder__display-name-wrapper'>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {isEditing ? (
          <RubricsHeaderForm onClose={closeForm} />
        ) : (
          <h3 className='rubrics-builder__display-name'>
            <span>{name}</span>
            <span>&nbsp;({displayName})</span>
          </h3>
        )}
      </Formik>
      <DeprecatedIconButton
        data-testid='rubric-header-edit-button'
        icon={<Edit className='rubrics-builder__edit-icon' />}
        size='sm'
        onClick={openForm}
      />
    </div>
  );
};
