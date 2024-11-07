import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import { ApplicationFormValues } from '@dc/components/Opportunities/OpportunityApplicationModal/OpportunityApplication';

import SharedTextarea from '@shared/components/Textarea/Textarea';

import styles from './ApplicationQuestion.module.sass';

type Props = {
  questions: {
    id: string;
    answer: string;
    question?: string;
  }[];
  answers: { answer: string }[];
  isReadOnly: boolean;
};

export const ApplicationQuestions = ({ questions, answers, isReadOnly }: Props) => {
  const { t } = useTranslation();

  const { values, handleChange, errors } = useFormikContext<ApplicationFormValues>();

  return (
    <div className={styles.opportunityQuestion}>
      <section>
        {!isReadOnly && (
          <h5 className='text-font-primary text-base font-bold mb-sm'>
            {t('opportunities.application.title')}
          </h5>
        )}
        {values.map((answer, index) => {
          if (isReadOnly) {
            return (
              <>
                <h6 className='text-sm mb-xs'>{questions[index].question!}</h6>
                <p className='text-sm mb-0'>{answers && answers[index].answer}</p>
              </>
            );
          }

          return (
            <SharedTextarea
              key={values[index].questionId}
              className={styles.question}
              disabled={isReadOnly}
              errorMessage={errors[index]?.answer}
              label={questions[index].question!}
              name={`[${index}].answer`}
              value={values[index].answer! || (answers && answers[index].answer)}
              onChange={handleChange}
            />
          );
        })}
      </section>
    </div>
  );
};
