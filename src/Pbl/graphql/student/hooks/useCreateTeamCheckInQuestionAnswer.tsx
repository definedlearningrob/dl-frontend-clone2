import { useMutation } from '@apollo/client';

import CREATE_TEAM_CHECK_IN_QUESTION, {
  CreateTeamCheckInSubmissionAnswerData,
  CreateTeamCheckInSubmissionAnswerMutationInput,
} from '../mutations/createTeamCheckInSubmissionAnswer';

type MutationParams = {
  id: string;
  answer: string;
};

export const useCreateTeamCheckInQuestionAnswer = () => {
  const [mutate, { loading }] = useMutation<
    CreateTeamCheckInSubmissionAnswerData,
    CreateTeamCheckInSubmissionAnswerMutationInput
  >(CREATE_TEAM_CHECK_IN_QUESTION);

  const createTeamCheckInQuestionAnswer = async ({ id, answer }: MutationParams) => {
    await mutate({
      variables: {
        input: {
          teamCheckInSubmissionId: id,
          answer,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ id, __typename: 'TeamCheckInSubmission' }),
          fields: {
            answers(existing, { toReference }) {
              const teamSubmission =
                data?.createTeamCheckInSubmissionAnswer.teamCheckInSubmissionAnswer;
              const teamSubmissionAnswerRef = toReference({
                __typename: 'TeamCheckInSubmissionAnswer',
                id: teamSubmission?.id,
              });

              return [...existing, teamSubmissionAnswerRef];
            },
          },
        });
      },
    });
  };

  return [createTeamCheckInQuestionAnswer, { loading }] as const;
};
