import { Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { SurveyQuestion } from '@dc/components/Student/Lesson/Survey/Form/SurveyQuestion';
import { TCareerReviewSurvey } from '@dc/components/Student/Lesson/types';

import styles from '@pbl/components/User/Library/Checkins/Details/Question/EditMode/EditMode.module.sass';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  questions: TCareerReviewSurvey['questions'];
  isSaving: boolean;
  version?: number;
  previewOnly?: boolean;
};

export const SurveyForm = ({ questions, isSaving, version = 2, previewOnly }: Props) => {
  const { t } = useTranslation();

  return (
    <Form className={styles.form}>
      {questions.map((question, questionIndex) => (
        <SurveyQuestion
          key={question.id}
          disabled={previewOnly}
          question={question}
          questionIndex={questionIndex}
          version={version}
        />
      ))}
      {!previewOnly && (
        <SharedButton className='ml-auto' disabled={isSaving} type='submit' variant='primary'>
          {t('common.actions.save')}
        </SharedButton>
      )}
    </Form>
  );
};
