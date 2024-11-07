import { useParams } from 'react-router-dom';
import { InternalRefetchQueriesInclude } from '@apollo/client';

import { useCreateCheckInQuestionAnswer } from '@dc/graphql/student/hooks/useCreateCheckInQuestionAnswer';
import { useUpdateCheckInQuestionAnswer } from '@dc/graphql/student/hooks/useUpdateCheckInQuestionAnswer';

type Props = {
  checkInQuestionId: string;
};

type CreateFormValues = {
  answer: string;
};

type EditFormValues = {
  id: string;
  answer: string;
};

type SubmitCheckInAnswerParams = {
  values: CreateFormValues | EditFormValues;
  refetchQueries?: InternalRefetchQueriesInclude;
};

export const useSubmitCheckInQuestionAnswer = ({ checkInQuestionId }: Props) => {
  const { lessonId } = useParams<{ projectId: string; lessonId: string }>();

  const [createStudentCheckInAnswer, { loading: isCreateAnswerLoading }] =
    useCreateCheckInQuestionAnswer(lessonId);
  const [updateStudentCheckInAnswer, { loading: isUpdateAnswerLoading }] =
    useUpdateCheckInQuestionAnswer();

  const createCheckInAnswer = (
    values: CreateFormValues,
    refetchQueries?: InternalRefetchQueriesInclude
  ) => {
    createStudentCheckInAnswer({ answer: values.answer, id: checkInQuestionId }, refetchQueries);
  };

  const updateCheckInAnswer = (
    values: EditFormValues,
    refetchQueries?: InternalRefetchQueriesInclude
  ) => {
    updateStudentCheckInAnswer(values, refetchQueries);
  };

  const submitCheckInAnswer = ({ values, refetchQueries }: SubmitCheckInAnswerParams) => {
    if ('id' in values) {
      updateCheckInAnswer(values, refetchQueries);
    } else {
      createCheckInAnswer(values, refetchQueries);
    }
  };

  const isLoading = isCreateAnswerLoading || isUpdateAnswerLoading;

  return [submitCheckInAnswer, { loading: isLoading }] as const;
};
