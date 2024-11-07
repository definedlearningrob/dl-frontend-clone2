import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import SharedModal from '@shared/components/Modal/Modal';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

import { StatementForm } from './StatementForm';

export type FormValues = {
  name: string;
  required: boolean;
  question: {
    text: string;
    questionType: STATEMENT_QUESTION_TYPE;
    options: {
      id: string;
      option: string;
    }[];
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
  initialValues: FormValues;
  title: string;
  buttonText?: string;
};

export const StatementModal = ({
  onClose,
  onSubmit,
  isOpen,
  initialValues,
  title,
  buttonText,
}: Props) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(t('validation.messages.required')),
  });

  return (
    <SharedModal isOpen={isOpen} variant='wide' onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading className='text-sm xxxl:text-base'>{title}</SharedModal.Heading>
      </SharedModal.Header>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <StatementForm buttonText={buttonText} onClose={onClose} />
      </Formik>
    </SharedModal>
  );
};
