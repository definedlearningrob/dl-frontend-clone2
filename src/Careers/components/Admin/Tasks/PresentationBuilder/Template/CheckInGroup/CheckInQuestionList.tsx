import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProjectIsAssigned } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/hooks/useProjectIsAssigned';
import { CheckInQuestionFormStatus } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/CheckInQuestionFormStatus/CheckInQuestionFormStatus';
import { CheckInQuestionItem } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInGroup/CheckInQuestionItem';

import Button from '@shared/components/Button/Button';
import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { useRole } from '@shared/hooks/useRole';

import { CheckInQuestionModal } from './CheckInQuestionList/CheckInQuestionModal';

type Props = {
  questions: TCheckInQuestion[];
  groupName: string;
};

export const CheckInQuestionList = ({ questions, groupName }: Props) => {
  const { t } = useTranslation();
  const { teamId } = useParams<{ teamId: string }>();
  const { isStudent } = useRole();
  const projectIsAssigned = useProjectIsAssigned();

  const [questionId, setQuestionId] = useState<string | null>(null);

  const handleAnswer = (questionId: string) => {
    setQuestionId(questionId);
  };

  const handleCloseModal = () => {
    setQuestionId(null);
  };

  const questionToDisplay = questionId
    ? questions.find((question) => question.id === questionId)
    : null;

  return (
    <div className='flex flex-col gap-sm'>
      <h4 className='text-left !normal-case'>{groupName}</h4>
      {questions.map((question) => {
        const { answer, teamSubmission } = question;

        const properAnswer = teamId ? teamSubmission : answer;

        return (
          <div
            key={question.id}
            className='flex justify-between items-start gap-base group hover:bg-primary-200 p-xs rounded-sm'>
            <CheckInQuestionItem question={question} />
            <div className='flex items-center gap-sm'>
              {isStudent && projectIsAssigned && (
                <div className='text-neutral-800 text-left flex items-start'>
                  <CheckInQuestionFormStatus answer={properAnswer} showAnswersCount={true} />
                </div>
              )}
              {isStudent && (
                <div>
                  <Button
                    className='hover:bg-primary-500 hover:text-white whitespace-nowrap'
                    size='sm'
                    variant='primary-outlined'
                    onClick={() => handleAnswer(question.id)}>
                    {t('presentation.editAnswer')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {questionToDisplay && (
        <CheckInQuestionModal question={questionToDisplay} onClose={handleCloseModal} />
      )}
    </div>
  );
};
