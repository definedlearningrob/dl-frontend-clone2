import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import { AutoSizeTextarea } from '@shared/components/AutoSizeTextarea/AutoSizeTextarea';
import SharedButton from '@shared/components/Button/Button';
import { useRole } from '@shared/hooks/useRole';

import { TCheckInQuestion } from '../types';

type FormikValues = {
  answer?: string;
};

type Props = {
  onEditClick: () => void;
  isEditingAnswer: boolean;
  checkInQuestion: TCheckInQuestion;
};

export const LessonCheckInQuestionForm = ({
  checkInQuestion,
  isEditingAnswer,
  onEditClick,
}: Props) => {
  const { t } = useTranslation();

  const { isPublic, isUser } = useRole();
  const disabledButton = isUser || isPublic;
  const { isSubmitting, submitForm } = useFormikContext<FormikValues>();

  const disabledTextarea = !isEditingAnswer || isUser || isPublic;
  const shouldDisplaySaveButton = isEditingAnswer || isUser || isPublic;

  return (
    <Form>
      <AutoSizeTextarea
        disabled={disabledTextarea}
        labelText={checkInQuestion.question}
        name='answer'
      />
      <SharedButton
        className='ms-auto'
        disabled={disabledButton}
        isLoading={isSubmitting}
        minWidth='md'
        size='md'
        type='button'
        variant={shouldDisplaySaveButton ? 'primary' : 'primary-outlined'}
        onClick={shouldDisplaySaveButton ? submitForm : onEditClick}>
        {shouldDisplaySaveButton ? t('sharedCommon.save') : t('sharedCommon.edit')}
      </SharedButton>
    </Form>
  );
};
