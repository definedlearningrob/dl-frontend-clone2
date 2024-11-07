import { InternalRefetchQueriesInclude, useMutation } from '@apollo/client';

import { CREATE_CHECKIN_QUESTION_ANSWER } from '@dc/graphql/student/mutations/createCheckInQuestionAnswer';

type MutationParams = {
  id: string;
  answer: string;
};

export const useCreateCheckInQuestionAnswer = (lessonId: string) => {
  const [mutate, { loading }] = useMutation(CREATE_CHECKIN_QUESTION_ANSWER);

  const createCheckInQuestionAnswer = async (
    { id, answer }: MutationParams,
    refetchQueries?: InternalRefetchQueriesInclude
  ) => {
    await mutate({
      variables: {
        input: {
          checkInQuestionId: id,
          lessonId,
          answer,
        },
      },
      refetchQueries,
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ id, __typename: 'CheckInQuestion' }),
          fields: {
            answer(existing, { toReference }) {
              const checkInQuestionAnswer = data?.createCheckInQuestionAnswer.checkInQuestionAnswer;

              return (
                toReference({
                  __typename: 'CheckInQuestionAnswer',
                  id: checkInQuestionAnswer?.id,
                }) ?? existing
              );
            },
          },
        });
      },
    });
  };

  return [createCheckInQuestionAnswer, { loading }] as const;
};
