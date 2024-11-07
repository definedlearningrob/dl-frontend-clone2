import { Form, useFormikContext } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty, isNull } from 'lodash-es';
import cx from 'classnames';

import { TCheckInQuestionAnswer, TCheckInTeamSubmission } from '@pbl/components/Project/types';
import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';

import { SubmitDisabledStage } from '@shared/components/SubmitDisabledStage';
import { useRole } from '@shared/hooks/useRole';
import CheckInQuestionFormStatus from '@shared/components/CheckIns/CheckInQuestion/CheckInQuestionForm/CheckInQuestionFormStatus/CheckInQuestionFormStatus';
import { AutoSizeTextarea } from '@shared/components/AutoSizeTextarea/AutoSizeTextarea';
import SharedButton from '@shared/components/Button/Button';

import styles from './CheckInQuestionForm.module.sass';

type Props = {
  canSubmit: boolean | null;
  hideSavedInput?: boolean;
  answer: TCheckInQuestionAnswer | TCheckInTeamSubmission | null;
};

type FormikValues = {
  answer?: string;
  setValues?: (value: { answer: string }) => void;
};

const CheckInQuestionForm = ({ answer, canSubmit, hideSavedInput }: Props) => {
  const { t } = useTranslation();
  const { isStudent, isPublic } = useRole();
  const { projectIsAssigned } = useCheckIns();

  const { values, isSubmitting, initialValues, setFieldValue, dirty } =
    useFormikContext<FormikValues>();
  const [isEditingAnswer, setIsEditingAnswer] = useState(() => isEmpty(initialValues.answer));

  const newTeamMember = !isNull(canSubmit) && !canSubmit;
  const disabledButton =
    !isStudent || isPublic || (!dirty && isEditingAnswer) || !projectIsAssigned;
  const disabledTextarea = !isEditingAnswer || !isStudent || isPublic || !projectIsAssigned;
  const showTextArea = !newTeamMember && (!hideSavedInput || isEditingAnswer);
  const formActionsClasses = cx(styles.formActions, {
    [styles.newTeamMember]: newTeamMember,
  });

  const handleSetEditingAnswer = (value: boolean) => {
    const currentAnswer = values.answer?.trim();
    const containsAnswer = !isEmpty(currentAnswer);

    if (containsAnswer) {
      setIsEditingAnswer(value);
      setFieldValue('answer', currentAnswer);
    }
  };

  return (
    <Form>
      {showTextArea && (
        <AutoSizeTextarea
          className={styles.questionTextarea}
          disabled={disabledTextarea}
          name='answer'
        />
      )}
      {newTeamMember && !isPublic && (
        <SubmitDisabledStage className={styles.submitDisabledInfo} type='check-in' />
      )}
      <div className={formActionsClasses}>
        {isStudent && projectIsAssigned && (
          <div className={styles.questionStatusWrapper}>
            <span className={styles.statusTitle}>{t('components.checkIns.status')}:</span>
            <CheckInQuestionFormStatus answer={answer} />
          </div>
        )}
        {!newTeamMember && projectIsAssigned && (
          <SharedButton
            className={styles.submitButton}
            disabled={disabledButton}
            isLoading={isSubmitting}
            size='md'
            type={isEditingAnswer ? 'button' : 'submit'}
            variant={isEditingAnswer ? 'primary' : 'primary-outlined'}
            onClick={() => handleSetEditingAnswer(!isEditingAnswer)}>
            {isEditingAnswer ? t('sharedCommon.save') : t('sharedCommon.edit')}
          </SharedButton>
        )}
      </div>
    </Form>
  );
};

export default CheckInQuestionForm;
