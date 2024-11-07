import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as QuestionIcon } from '@shared/svg/question.svg';
import { TPlanGroupStatementQuestion } from '@shared/graphql/user/query/studentPortfolioPlanWithEvaluation';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

type Props = {
  question: TPlanGroupStatementQuestion | null;
};

const getAnswer = (question: TPlanGroupStatementQuestion) => {
  const answers = question.answer?.answer || [];

  const selectedOptions = question?.options.filter((option) => answers.includes(option.option));

  return selectedOptions?.map((option) => option.option).join(', ');
};

export const Question = ({ question }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  if (isEmpty(question)) {
    return null;
  }

  const isTextQuestion =
    question.questionType === STATEMENT_QUESTION_TYPE.LONG_TEXT ||
    question.questionType === STATEMENT_QUESTION_TYPE.SHORT_TEXT;

  const rawAnswer = question?.answer?.answer;

  const answer =
    question && isTextQuestion && !isEmpty(rawAnswer) ? rawAnswer : getAnswer(question);

  return (
    <div>
      <div className='uppercase text-font-primary text-xxs font-bold leading-sm mb-xxs'>
        {question.text}
      </div>
      <div className='mx-sm my-x flex gap-xs items-center'>
        <div>
          {isFullHD ? (
            <div className='h-md flex justify-center items-center rounded-sm text-xs font-medium leading-lg w-[80px] bg-neutral-200 text-neutral-700 group-hover/evidence-item:bg-white'>
              {t('studentGoalReport.answer')}
            </div>
          ) : (
            <IconContainer
              Icon={QuestionIcon}
              className='bg-neutral-200 text-font-secondary rounded-sm'
              paddingSize='xxs'
              size='base'
            />
          )}
        </div>
        <div className='leading-lg text-xxs font-medium'>
          <div className='text-font-primary'>
            {isEmpty(answer) ? (
              <span className='italic text-font-secondary font-medium'>
                {t('studentGoalReport.noAnswer')}
              </span>
            ) : (
              answer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
