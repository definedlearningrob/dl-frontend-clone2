import { useTranslation } from 'react-i18next';
import { FormikHelpers } from 'formik';
import { range } from 'lodash-es';
import { makeUniqueId } from '@apollo/client/utilities';

import { useCreateStatement } from '@dc/graphql/user/hooks/useCreateStatement';

import { callToast } from '@shared/components/Toaster/Toaster';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

import { FormValues, StatementModal } from './StatementModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  statementsCount: number;
};

export const EMPTY_STATEMENT_QUESTION = {
  text: '',
  questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
  options: range(0, 5).map(() => ({
    option: '',
    id: makeUniqueId('StatementOption'),
  })),
};

const initialValues = {
  name: '',
  required: true,
  question: EMPTY_STATEMENT_QUESTION,
};

export const CreateStatementModal = ({ onClose, isOpen, statementsCount }: Props) => {
  const { t } = useTranslation();
  const [createStatement] = useCreateStatement();

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    await createStatement({ ...values, step: statementsCount + 1 });
    callToast(
      'success',
      t('common.notifications.success.created', { name: t('admin.planGroups.statements.label') })
    );
    actions.resetForm();
    onClose();
  };

  return (
    <StatementModal
      buttonText={t('common.actions.create')}
      initialValues={initialValues}
      isOpen={isOpen}
      title={t('admin.planGroups.statements.createNewStatement')}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};
