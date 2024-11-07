import { useMutation } from '@apollo/client';

import UPDATE_CHECK_IN_QUESTION, {
  TUpdateCheckInQuestionAnswer,
  TUpdateCheckInQuestionAnswerMutationInput,
} from '../mutations/updateCheckInQuestionAnswer';

type MutationParams = {
  id: string;
  answer: string;
};

export const useUpdateCheckInQuestionAnswer = () => {
  const [mutate, { loading }] = useMutation<
    TUpdateCheckInQuestionAnswer,
    TUpdateCheckInQuestionAnswerMutationInput
  >(UPDATE_CHECK_IN_QUESTION);

  const updateCheckInQuestionAnswer = async ({ id, answer }: MutationParams) => {
    await mutate({
      variables: { input: { id, answer } },
      optimisticResponse: {
        updateCheckInQuestionAnswer: {
          checkInQuestionAnswer: {
            id,
            answer,
            updatedAt: new Date().toISOString(),
          },
        },
      },
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
