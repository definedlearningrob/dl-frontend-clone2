import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import cx from 'classnames';

import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

type Props = {
  questions: TCareerReviewSurveyQuestion[];
};

export const SurveySummary = ({ questions }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='mb-base'>
        <h4 className='mb-xs'>{t('careerReviewSurvey.previousAnswers')}</h4>
        <p className='text-xs xxxl:text-sm leading-lg'>{t('careerReviewSurvey.summaryInfo')}</p>
      </div>
      {questions.map(({ answer, question }, questionIndex) => {
        const questionLabel = `${questionIndex + 1}. ${question}`;

        const questionLabelClassName = cx('mb-0', { ['mb-xs']: !isEmpty(answer) });

        return (
          <div
            key={`question-${question}`}
            className='rounded-sm p-sm border border-neutral-300 bg-neutral-200 mb-base last-of-type:mb-0'>
            <h6 className={questionLabelClassName}>{questionLabel}</h6>
            <ul className='list-disc pl-base marker:text-neutral-700 text-xs'>
              {answer.map((answer) => (
                <li key={`answer-${answer}`} className='leading-lg'>
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};
