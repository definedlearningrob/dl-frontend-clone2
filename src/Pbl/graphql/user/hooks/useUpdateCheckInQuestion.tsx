import { useMutation } from '@apollo/client';

import UPDATE_CHECKIN, {
  TUpdateCheckInQuestionData,
  TUpdateCheckInQuestionVariables,
} from '../mutations/updateCheckInQuestion';
import { TLibraryCheckin } from '../queries/checkInQuestions';

type MutationParams = {
  id: string;
  question: string;
};

export const useUpdateCheckInQuestion = () => {
  const [mutate, { loading }] = useMutation<
    TUpdateCheckInQuestionData,
    TUpdateCheckInQuestionVariables
  >(UPDATE_CHECKIN);

  const updateCheckInQuestion = async ({ id, question }: MutationParams) => {
    await mutate({
      variables: {
        input: {
          id,
          question,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: 'ROOT_QUERY',
          fields: {
            checkInQuestions(checkInQuestions) {
              return {
                ...checkInQuestions,
                nodes: checkInQuestions.nodes.map((checkInQuestion: TLibraryCheckin) =>
                  checkInQuestion.id === id ? { id, question } : checkInQuestion
                ),
              };
            },
            checkInQuestion(checkInQuestion) {
              return checkInQuestion.id === id
                ? {
                    ...checkInQuestion,
                    question,
                  }
                : checkInQuestion;
            },
          },
        });

        data?.updateCheckInQuestion.checkInQuestion.tasks.forEach((task) =>
          cache.modify({
            id: cache.identify({ id: task.id, __typename: 'Task' }),
            fields: {
              checkInQuestions({ INVALIDATE }) {
                return INVALIDATE;
              },
            },
          })
        );
      },
    });
  };

  return [updateCheckInQuestion, { loading }] as const;
};
