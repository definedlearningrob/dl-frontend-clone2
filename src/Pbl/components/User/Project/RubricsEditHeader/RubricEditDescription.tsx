import { t } from 'i18next';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';

import updateRubricMutation from '@shared/graphql/user/mutations/updateRubric';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { getFormErrors } from '@shared/utils/graphql';
import { ReactComponent as Edit } from '@shared/svg/edit.svg';
import { cleanInjection } from '@shared/utils/cleanInjection';
import { useToggle } from '@shared/hooks/useToggle';

import { RubricsDescriptionForm } from './RubricsDescirptionForm';

type Props = {
  description: string;
  id: string;
};

type FormValues = {
  description: string;
};

const validationSchema = Yup.object().shape({
  description: Yup.string().required(t('validation.messages.required')),
});

export const RubricsEditDescription = ({ id, description }: Props) => {
  const [isEditing, , openForm, closeForm] = useToggle(false);

  const [updateRubric] = useMutation(updateRubricMutation);

  const handleSubmit = async (
    { description }: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateRubric({
        variables: {
          input: {
            id,
            description,
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

  const initialValues = {
    description,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {isEditing ? (
        <RubricsDescriptionForm onClose={closeForm} />
      ) : (
        <div className='rubrics-builder__description'>
          <div>
            <p>{t('common.fields.common.description')}</p>
            <p
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={cleanInjection(description)}
              data-testid='rubric-description'
            />
          </div>
          <DeprecatedIconButton
            data-testid='rubric-description-edit-button'
            icon={<Edit className='rubrics-builder__edit-icon' />}
            size='sm'
            onClick={openForm}
          />
        </div>
      )}
    </Formik>
  );
};
