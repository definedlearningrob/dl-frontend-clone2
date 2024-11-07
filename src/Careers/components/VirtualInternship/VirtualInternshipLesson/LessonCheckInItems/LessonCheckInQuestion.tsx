import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GraphQLError } from 'graphql';
import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';

import { useSubmitCheckInQuestionAnswer } from '@dc/graphql/student/hooks/useSubmitCheckInQuestionsAnswer';
import { VIRTUAL_INTERNSHIP_CONTENT_QUERY } from '@dc/graphql/student/queries/virtualInternshipContent';

import { getFormErrors } from '@shared/utils/graphql';

import { TCheckInQuestion } from '../types';

import { LessonCheckInQuestionForm } from './LessonCheckInQuestionForm';

type Props = {
  checkInQuestion: TCheckInQuestion;
};

type FormValues = {
  id?: string;
  answer: string;
};

export const LessonCheckInQuestion = ({ checkInQuestion }: Props) => {
  const { t } = useTranslation();
  const { opportunityId } = useParams<{ opportunityId: string }>();

  const hasAnswer = 'answer' in checkInQuestion;

  const [isEditingAnswer, setIsEditingAnswer] = useState(
    hasAnswer && isEmpty(checkInQuestion.answer)
  );

  const initialValues =
    hasAnswer && checkInQuestion.answer
      ? {
          id: checkInQuestion.answer.id,
          answer: checkInQuestion.answer.answer,
        }
      : { answer: '' };

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required(t('validation.messages.required')),
  });

  const [submitCheckInAnswer] = useSubmitCheckInQuestionAnswer({
    checkInQuestionId: checkInQuestion.id,
  });

  const handleOnSubmit = async (values: FormValues, actions: { setErrors?: Function }) => {
    const { setErrors } = actions;

    setIsEditingAnswer(false);

    if (values.answer === initialValues.answer) {
      return;
    }

    try {
      await submitCheckInAnswer({
        values,
        refetchQueries: [{ query: VIRTUAL_INTERNSHIP_CONTENT_QUERY, variables: { opportunityId } }],
      });
    } catch (error) {
      const errors = getFormErrors(error as { graphQLErrors: GraphQLError[] });
      setErrors && setErrors(errors);
    }
  };

  const handleEditClick = () => {
    if (!isEditingAnswer) {
      setIsEditingAnswer(true);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleOnSubmit(values, actions)}>
      <LessonCheckInQuestionForm
        checkInQuestion={checkInQuestion}
        isEditingAnswer={isEditingAnswer}
        onEditClick={handleEditClick}
      />
    </Formik>
  );
};
