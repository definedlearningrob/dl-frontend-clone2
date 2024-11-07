import { useMutation } from '@apollo/client';

import teamProjectQuery from '@pbl/graphql/student/queries/teamProject';

import { TCheckInGroup, TCheckInQuestion } from '@shared/components/CheckIns/types';

import CREATE_TEAM_CHECK_IN_SUBMISSION, {
  CreateTeamCheckInSubmissionData,
  CreateTeamCheckInSubmissionMutationInput,
} from '../mutations/createTeamCheckInSubmission';

type MutationParams = {
  taskId: string;
  checkInQuestionId: string;
  teamId: string;
};

export const useCreateTeamCheckInSubmission = () => {
  const [mutate, { loading }] = useMutation<
    CreateTeamCheckInSubmissionData,
    CreateTeamCheckInSubmissionMutationInput
  >(CREATE_TEAM_CHECK_IN_SUBMISSION);

  const createTeamCheckInSubmission = async ({
    taskId,
    checkInQuestionId,
    teamId,
  }: MutationParams) =>
    await mutate({
      variables: {
        input: {
          checkInQuestionId,
          teamId,
          taskId,
        },
      },
      refetchQueries: [
        {
          query: teamProjectQuery,
          variables: { id: taskId, teamId, track: true, trackPresentation: true },
        },
      ],
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ id: taskId, __typename: 'Task' }),
          fields: {
            checkInGroups(checkInGroups = [], { toReference }) {
              const teamSubmission = data?.createTeamCheckInSubmission.teamCheckInSubmission;
              const teamSubmissionRef = toReference({
                __typename: 'TeamCheckInSubmission',
                id: teamSubmission?.id,
              });

              return checkInGroups.map((checkInGroup: TCheckInGroup) => ({
                ...checkInGroup,
                questions: checkInGroup.questions.map((question) =>
                  question.id !== checkInQuestionId
                    ? question
                    : { ...question, teamSubmission: teamSubmissionRef }
                ),
              }));
            },
            checkInQuestions(checkInQuestions = [], { toReference }) {
              const teamSubmission = data?.createTeamCheckInSubmission.teamCheckInSubmission;
              const teamSubmissionRef = toReference({
                __typename: 'TeamCheckInSubmission',
                id: teamSubmission?.id,
              });

              return checkInQuestions.map((question: TCheckInQuestion) =>
                question.id !== checkInQuestionId
                  ? question
                  : { ...question, teamSubmission: teamSubmissionRef }
              );
            },
          },
        });
      },
    });

  return [createTeamCheckInSubmission, { loading }] as const;
};
