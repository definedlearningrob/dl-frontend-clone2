import { InternalRefetchQueriesInclude, useMutation } from '@apollo/client';

import { UPDATE_CHECKIN_QUESTION_ANSWER } from '../mutations/updateCheckInQuestionAnswer';

type MutationParams = {
  id: string;
  answer: string;
};

export const useUpdateCheckInQuestionAnswer = () => {
  const [mutate, { loading }] = useMutation(UPDATE_CHECKIN_QUESTION_ANSWER);

  const updateCheckInQuestionAnswer = async (
    { id, answer }: MutationParams,
    refetchQueries?: InternalRefetchQueriesInclude
  ) => {
    await mutate({
      variables: { input: { id, answer } },
      refetchQueries,
      update(cache) {
        cache.modify({
          id: cache.identify({
            id,
            __typename: 'CheckInQuestionAnswer',
          }),
          fields: {
            answer() {
              return answer;
            },
          },
        });
      },
    });
  };

  return [updateCheckInQuestionAnswer, { loading }] as const;
};
