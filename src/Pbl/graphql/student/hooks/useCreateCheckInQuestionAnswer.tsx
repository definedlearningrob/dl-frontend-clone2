import { useMutation } from '@apollo/client';

import projectQuery from '@pbl/graphql/student/queries/project';

import { TCheckInGroup, TCheckInQuestion } from '@shared/components/CheckIns/types';

import CREATE_CHECK_IN_QUESTION, {
  TCreateCheckInQuestionAnswer,
  TCreateCheckInQuestionAnswerMutationInput,
} from '../mutations/createCheckInQuestionAnswerMutation';

type MutationParams = {
  id: string;
  answer: string;
};

export const useCreateCheckInQuestionAnswer = (projectId: string) => {
  const [mutate, { loading }] = useMutation<
    TCreateCheckInQuestionAnswer,
    TCreateCheckInQuestionAnswerMutationInput
  >(CREATE_CHECK_IN_QUESTION);

  const createCheckInQuestionAnswer = async ({ id, answer }: MutationParams) => {
    await mutate({
      variables: {
        input: {
          checkInQuestionId: id,
          taskId: projectId,
          answer,
        },
      },
      optimisticResponse: {
        createCheckInQuestionAnswer: {
          checkInQuestionAnswer: {
            id: id,
            answer,
            grade: null,
          },
        },
      },
      refetchQueries: [
        { query: projectQuery, variables: { id: projectId, track: true, trackPresentation: true } },
      ],
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ id: projectId, __typename: 'Task' }),
          fields: {
            checkInGroups(checkInGroups = [], { toReference }) {
              const checkInQuestionAnswer = data?.createCheckInQuestionAnswer.checkInQuestionAnswer;
              const checkInQuestionAnswerRef = toReference({
                __typename: 'CheckInQuestionAnswer',
                id: checkInQuestionAnswer?.id,
              });

              return checkInGroups.map((checkInGroup: TCheckInGroup) => ({
                ...checkInGroup,
                questions: checkInGroup.questions.map((question) =>
                  question.id !== id ? question : { ...question, answer: checkInQuestionAnswerRef }
                ),
              }));
            },
            checkInQuestions(checkInQuestions = [], { toReference }) {
              const checkInQuestionAnswer = data?.createCheckInQuestionAnswer.checkInQuestionAnswer;
              const checkInQuestionAnswerRef = toReference({
                __typename: 'CheckInQuestionAnswer',
                id: checkInQuestionAnswer?.id,
              });

              return checkInQuestions.map((question: TCheckInQuestion) =>
                question.id !== id ? question : { ...question, answer: checkInQuestionAnswerRef }
              );
            },
          },
        });
      },
    });
  };

  return [createCheckInQuestionAnswer, { loading }] as const;
};
