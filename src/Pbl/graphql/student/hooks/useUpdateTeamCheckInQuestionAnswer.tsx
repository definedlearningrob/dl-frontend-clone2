import { Reference, useMutation } from '@apollo/client';

import UPDATE_TEAM_CHECK_IN_QUESTION, {
  UpdateTeamCheckInSubmissionAnswerData,
  UpdateTeamCheckInSubmissionAnswerMutationInput,
} from '../mutations/updateTeamCheckInSubmissionAnswer';

type MutationParams = {
  id: string;
  teamSubmissionId: string;
  answer: string;
};

export const useUpdateTeamCheckInQuestionAnswer = () => {
  const [mutate, { loading }] = useMutation<
    UpdateTeamCheckInSubmissionAnswerData,
    UpdateTeamCheckInSubmissionAnswerMutationInput
  >(UPDATE_TEAM_CHECK_IN_QUESTION);

  const updateTeamCheckInQuestionAnswer = ({ id, answer, teamSubmissionId }: MutationParams) => {
    mutate({
      variables: {
        input: {
          id,
          answer,
        },
      },
      update(cache) {
        cache.modify({
          id: cache.identify({
            id: teamSubmissionId,
            __typename: 'TeamCheckInSubmission',
          }),
          fields: {
            answers(existing = [], { toReference, readField }) {
              const updatedSubmissionRef = toReference({
                __typename: 'TeamCheckInSubmissionAnswer',
                id,
              });

              return [
                ...existing.filter((ref: Reference) => readField('id', ref) !== id),
                updatedSubmissionRef,
              ];
            },
          },
        });
      },
    });
  };

  return [updateTeamCheckInQuestionAnswer, { loading }] as const;
};
