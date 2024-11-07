import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { castArray } from 'lodash-es';

import { callToast } from '@shared/components/Toaster/Toaster';

import { ANSWER_STATEMENT_QUESTION } from '../mutations/answerPlanGroupStatementQuestion';

type Params = {
  evaluationId: string;
  questionId: string;
  answer: string[];
};

export const useAnswerPlanGroupStatementQuestion = () => {
  const [mutate, mutationOptions] = useMutation(ANSWER_STATEMENT_QUESTION);
  const { t } = useTranslation();

  const answerPlanGroupStatementQuestion = async ({ evaluationId, questionId, answer }: Params) => {
    try {
      await mutate({
        variables: {
          input: {
            answer: castArray(answer),
            evaluationId,
            questionId,
          },
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify({
              id: questionId,
              __typename: 'PlanGroupStatementQuestion',
            }),
            fields: {
              answer(existing, { toReference }) {
                const createdAnswer = data?.answerPlanGroupStatementQuestion.answer;

                return (
                  toReference({
                    __typename: 'PlanGroupStatementQuestionAnswer',
                    id: createdAnswer?.id,
                  }) ?? existing
                );
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

  return [answerPlanGroupStatementQuestion, mutationOptions] as const;
};
