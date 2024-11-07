import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TOGGLE_CHECK_IN_QUESTION_HIDDEN } from '@pbl/graphql/user/mutations/toggleCheckInQuestionHidden';
import { TCheckInGroup } from '@pbl/components/Project/types';

import { callToast } from '@shared/components/Toaster/Toaster';

type Params = {
  taskId: string;
  checkInGroupId: string;
  checkInQuestionId: string;
};

export const useToggleCheckInQuestionHidden = ({
  taskId,
  checkInGroupId,
  checkInQuestionId,
}: Params) => {
  const [mutate, mutationOptions] = useMutation(TOGGLE_CHECK_IN_QUESTION_HIDDEN);
  const { t } = useTranslation();

  const toggleCheckInQuestionHidden = async (isHidden: boolean) => {
    try {
      await mutate({
        variables: {
          input: { taskId, checkInGroupId, checkInQuestionId },
        },
        optimisticResponse: {
          toggleCheckInQuestionHidden: {
            checkInGroup: {
              id: checkInGroupId,
              questions: [{ id: checkInQuestionId, isHidden }],
            },
          },
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify({ __typename: 'Task', id: taskId }),
            fields: {
              checkInGroups(existing = []) {
                const updatedCheckInQuestions =
                  data?.toggleCheckInQuestionHidden.checkInGroup.questions;

                return existing.map((checkInGroup: TCheckInGroup) => {
                  if (checkInGroup.id !== checkInGroupId) {
                    return checkInGroup;
                  }

                  return {
                    ...checkInGroup,
                    questions: checkInGroup.questions.map((checkInQuestion) => {
                      const updatedQuestion = updatedCheckInQuestions?.find(
                        (question) => question.id === checkInQuestion.id
                      );

                      return updatedQuestion
                        ? { ...checkInQuestion, ...updatedQuestion }
                        : checkInQuestion;
                    }),
                  };
                });
              },
            },
          });
        },
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return [toggleCheckInQuestionHidden, mutationOptions] as const;
};
