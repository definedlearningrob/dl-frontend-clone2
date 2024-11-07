import { useTranslation } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { ApolloError } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

import SharedModal from '@shared/components/Modal/Modal';
import { EditRubricHeadingForm } from '@shared/components/RubricsEditor/EditRubricsHeadingModal/EditRubricHeadingForm';
import { useRubricEditor } from '@shared/components/RubricsEditor/RubricsEditorProvider';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

type Props = {
  onClose: () => void;
  rubricId: string;
};

export type RubricHeadingFormValues = {
  id: string;
  name: string;
  multiplier: number;
  tags: TTag[];
};

export const EditRubricsHeadingModal = ({ onClose, rubricId }: Props) => {
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<RubricHeadingFormValues>>();

  const { isSystemAdmin } = useUserRole();

  const {
    editing: {
      heading: { handleSubmit: handleHeadingSubmit },
    },
    rubric,
  } = useRubricEditor();

  const heading = rubric.headings.find((heading) => heading.id === rubricId);

  if (!heading) return null;

  const initialValues = {
    id: heading.id,
    name: heading.name,
    multiplier: heading.multiplier,
    tags: heading?.tags || [],
  };

  const handleSubmit = async (values: RubricHeadingFormValues) => {
    const { tags, ...rest } = values;

    const valuesToSubmit = {
      ...rest,
      ...(isSystemAdmin && {
        tagIds: tags.map((tag) => tag.id),
      }),
    };

    try {
      await handleHeadingSubmit(valuesToSubmit);
      callToast('success', t('components.rubric.changesSavedSuccessfully'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
    onClose();
  };

  const validationSchema = Yup.object().shape({
    multiplier: Yup.number().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  return (
    <SharedModal
      ariaLabel={t('components.rubric.editRubricCriteria')}
      bypassFocusLock={true}
      isOpen={true}
      variant='wide'
      onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('components.rubric.editRubricCriteria')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='max-h-[75vh]'>
        <Formik
          initialValues={initialValues}
          // @ts-ignore
          innerRef={formRef}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <EditRubricHeadingForm />
        </Formik>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button className='min-w-[120px]' variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          className='min-w-[120px]'
          type='submit'
          variant='primary'
          onClick={() => {
            formRef.current && formRef.current.submitForm();
          }}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
