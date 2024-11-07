import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GraphQLError } from 'graphql';

import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { useSubmitCheckInQuestionAnswer } from '@pbl/hooks/useSubmitCheckInQuestionAnswer';

import CheckInQuestionForm from '@shared/components/CheckIns/CheckInQuestion/CheckInQuestionForm/CheckInQuestionForm';
import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { getFormErrors } from '@shared/utils/graphql';

import { CheckInSubmissions } from '../CheckInSubmissions/CheckInSubmissions';

import { CheckInQuestionHeader } from './CheckInQuestionHeader';
import styles from './CheckInQuestion.module.sass';

type Props = {
  checkInQuestion: TCheckInQuestion;
  questionIndex: number;
};

type FormValues = {
  id?: string;
  answer: string;
};

const CheckInQuestion = ({ checkInQuestion, questionIndex }: Props) => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TCurrentUserInfo>();
  const { addToItemsRef, team } = useCheckIns();
  const [submitCheckInAnswer] = useSubmitCheckInQuestionAnswer({
    checkInQuestion,
  });

  const userUuid = userInfo?.uuid;

  const { answer, teamSubmission } = checkInQuestion;

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required(t('validation.messages.required')),
  });

  const initialValues = useMemo(() => {
    const initialAnswer = team
      ? teamSubmission?.answers.find((answer) => answer.student.uuid === userUuid)
      : answer;

    if (initialAnswer) {
      return {
        id: initialAnswer.id,
        answer: initialAnswer.answer,
      };
    }

    return { answer: '' };
  }, [team, teamSubmission, answer]);

  const handleOnSubmit = async (values: FormValues, actions: { setErrors?: Function }) => {
    const { setErrors } = actions;

    if (values.answer === initialValues.answer) {
      return;
    }

    try {
      await submitCheckInAnswer(values);
    } catch (error) {
      const errors = getFormErrors(error as { graphQLErrors: GraphQLError[] });
      setErrors && setErrors(errors);
    }
  };

  return (
    <div ref={addToItemsRef} className={styles.checkInQuestionWrapper}>
      <CheckInQuestionHeader checkInQuestion={checkInQuestion} questionIndex={questionIndex} />
      <CheckInSubmissions submission={checkInQuestion.teamSubmission} userUuid={userUuid} />
      <div className={styles.inputWrapper}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleOnSubmit(values, actions)}>
          <CheckInQuestionForm
            answer={team ? teamSubmission : answer}
            canSubmit={teamSubmission && teamSubmission.canSubmit}
            hideSavedInput={!!team}
          />
        </Formik>
      </div>
    </div>
  );
};

export default CheckInQuestion;
