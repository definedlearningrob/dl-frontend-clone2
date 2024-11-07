import { useTranslation } from 'react-i18next';
import { FormikHelpers } from 'formik';
import { makeUniqueId } from '@apollo/client/utilities';
import { sortBy } from 'lodash-es';

import { useUpdateStatement } from '@dc/graphql/user/hooks/useUpdateStatement';

import { callToast } from '@shared/components/Toaster/Toaster';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

import { PlanStatement } from '../Statements';

import { FormValues, StatementModal } from './StatementModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  statement: PlanStatement;
};

export const EditStatementModal = ({ onClose, isOpen, statement }: Props) => {
  const { t } = useTranslation();
  const [updateStatement] = useUpdateStatement();

  const initialValues = {
    name: statement.name,
    required: statement.isRequired,
    question: {
      text: statement.question?.text || '',
      questionType: statement.question?.questionType || STATEMENT_QUESTION_TYPE.SHORT_TEXT,
      options: sortBy(statement.question?.options, 'step').map((option) => ({
        option: option.option,
        id: makeUniqueId('StatementOption'),
      })),
    },
  };

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    await updateStatement({ ...values, id: statement.id });
    callToast(
      'success',
      t('common.notifications.success.updated', { name: t('admin.planGroups.statements.label') })
    );
    actions.resetForm();
    onClose();
  };

  return (
    <StatementModal
      initialValues={initialValues}
      isOpen={isOpen}
      title={t('admin.planGroups.statements.editStatement')}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};
