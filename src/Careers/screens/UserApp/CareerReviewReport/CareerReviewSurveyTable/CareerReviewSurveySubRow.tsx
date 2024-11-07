import { CareerReviewSurveyAnswerTypes } from '@graphql/dc/users/types';
import { useTranslation } from 'react-i18next';

type Props = {
  row: any;
};

export const CareerReviewSurveySubRow = ({ row }: Props) => {
  const { t } = useTranslation();

  const cellClassNames =
    'text-xxs xxxl:text-xs leading-lg p-xs xxxl:px-x first:pl-base last:pr-base xxxl:first:pl-md xxxl:last:pr-md';

  const questionIndexClassNames =
    'w-base h-base shrink-0 rounded-sm bg-neutral-200 text-font-secondary flex items-center justify-center';

  const questionWrapperClassNames =
    'flex gap-sm items-baseline relative last:before:hidden before:absolute before:w-[1px] before:bg-neutral-300 before:left-x before:rounded-xs before:top-md before:bottom-xs';

  return (
    <tr className='border-b border-neutral-300'>
      <td className={cellClassNames} />
      <td className={cellClassNames} colSpan={4}>
        {row.original.questionAndAnswers.map((questionAndAnswer: any, index: number) => (
          <div key={questionAndAnswer.question.id} className={questionWrapperClassNames}>
            <div className={questionIndexClassNames}>{index + 1}</div>
            <div>
              <div className='text-font-secondary font-medium'>
                {questionAndAnswer.question.question}
              </div>
              <div className='relative text-font-primary my-xs'>
                <ul className='list-disc list-inside'>
                  {questionAndAnswer.answer
                    .filter(Boolean)
                    .map(
                      (
                        singleSelection: { value: string; type: CareerReviewSurveyAnswerTypes },
                        index: number
                      ) => (
                        <li key={index} className='leading-lg text-neutral-400'>
                          {singleSelection.type === CareerReviewSurveyAnswerTypes.CUSTOM && (
                            <span className='italic'>
                              {t('careerReviewSurveyReport.surveyReport.answers.other')}
                            </span>
                          )}
                          <span className='text-font-primary'>{singleSelection.value}</span>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </td>
    </tr>
  );
};
