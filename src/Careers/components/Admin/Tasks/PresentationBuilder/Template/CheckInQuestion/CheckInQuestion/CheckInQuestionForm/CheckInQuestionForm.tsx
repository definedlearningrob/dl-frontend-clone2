import { Form, useFormikContext } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty, isNull } from 'lodash-es';
import cx from 'classnames';

import { useProjectIsAssigned } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/hooks/useProjectIsAssigned';

import { TCheckInQuestionAnswer, TCheckInTeamSubmission } from '@pbl/components/Project/types';

import { useRole } from '@shared/hooks/useRole';
import { AutoSizeTextarea } from '@shared/components/AutoSizeTextarea/AutoSizeTextarea';
import Button from '@shared/components/Button/Button';

type Props = {
  canSubmit: boolean | null;
  answer: TCheckInQuestionAnswer | TCheckInTeamSubmission | null;
  toggleTeamSubmissionsModal: () => void;
  hideAllSubmissionsButton?: boolean;
};

type FormikValues = {
  answer?: string;
  setValues?: (value: { answer: string }) => void;
};

export const CheckInQuestionForm = ({
  answer,
  canSubmit,
  toggleTeamSubmissionsModal,
  hideAllSubmissionsButton,
}: Props) => {
  const { t } = useTranslation();
  const { isStudent, isPublic } = useRole();

  const projectIsAssigned = useProjectIsAssigned();

  const newTeamMember = !isNull(canSubmit) && !canSubmit;

  const { values, isSubmitting, initialValues, setFieldValue, dirty } =
    useFormikContext<FormikValues>();
  const [isEditingAnswer, setIsEditingAnswer] = useState(() => isEmpty(initialValues.answer));

  const disabledButton =
    !isStudent || isPublic || (!dirty && isEditingAnswer) || !projectIsAssigned;

  const disabledTextarea = !isEditingAnswer || !isStudent || isPublic || !projectIsAssigned;

  const handleSetEditingAnswer = (value: boolean) => {
    const currentAnswer = values.answer?.trim();
    const containsAnswer = !isEmpty(currentAnswer);

    if (containsAnswer) {
      setIsEditingAnswer(value);
      setFieldValue('answer', currentAnswer);
    }
  };

  const showSaveButton = !isPublic && ((!newTeamMember && projectIsAssigned) || !isStudent);

  const isTeamQuestion = answer && 'answers' in answer;

  const showAllSubmissionsButton =
    isStudent && !isEmpty(answer) && isTeamQuestion && !hideAllSubmissionsButton;

  return (
    <Form>
      <div className='flex items-end justify-between gap-base'>
        <AutoSizeTextarea
          className='!text-sm xxxl:!text-base [&_textarea]:py-sm [&_textarea]:xxxl:p-x [&_textarea]:!mb-0 '
          disabled={disabledTextarea}
          labelClassname='!mb-0'
          maxRows={3}
          name='answer'
          textAreaClassname='xxxl:!min-h-[96px] leading-lg xxxl:leading-base'
        />
        {showSaveButton && (
          <div
            className={cx('flex', {
              'flex-col gap-xs items-start': showAllSubmissionsButton,
            })}>
            {showAllSubmissionsButton && (
              <Button
                className='whitespace-nowrap'
                size='sm'
                variant='secondary'
                onClick={() => toggleTeamSubmissionsModal()}>
                {t('components.checkIns.showAllSubmissions')}
              </Button>
            )}
            <Button
              className='mb-base'
              disabled={disabledButton}
              isLoading={isSubmitting}
              size='sm'
              type={isEditingAnswer ? 'button' : 'submit'}
              variant={isEditingAnswer ? 'primary' : 'primary-outlined'}
              onClick={() => handleSetEditingAnswer(!isEditingAnswer)}>
              {isEditingAnswer ? t('sharedCommon.save') : t('sharedCommon.edit')}
            </Button>
          </div>
        )}
      </div>
    </Form>
  );
};
