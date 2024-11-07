import { gql, useMutation } from '@apollo/client';

import { TCheckInGroup, TCheckInQuestion } from '@pbl/components/Project/types';
import GRADE_SUBMISSION, {
  TGradeSubmisisonMutationVariables,
  TGradeSubmissionMutationData,
} from '@pbl/graphql/user/mutations/gradeSubmission';
import { SUBMISSION_TYPE } from '@pbl/resources/enums';

import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

const reduceGradingNeededCount = (questions: TCheckInQuestion[], gradedQuestionId: string) =>
  questions.map((question) => {
    if (question.id === gradedQuestionId) {
      return { ...question, gradingNeededCount: question.gradingNeededCount! - 1 };
    }

    return question;
  });

const useGradeCheckin = (projectId: string, checkInQuestionId: string, isTeamGrading?: boolean) => {
  const [mutate, { loading }] = useMutation<
    TGradeSubmissionMutationData,
    TGradeSubmisisonMutationVariables
  >(GRADE_SUBMISSION);

  const gradeCheckin = async (submissionId: string, status: SUBMISSION_GRADE_STATUS) =>
    mutate({
      variables: {
        input: {
          status,
          submissionId,
          submissionType: isTeamGrading
            ? SUBMISSION_TYPE.TEAM_CHECK_IN_SUBMISSION
            : SUBMISSION_TYPE.CHECK_IN_ANSWER,
          taskId: projectId,
        },
      },
      update: (cache, { data }) => {
        const typename = isTeamGrading ? 'TeamCheckInSubmission' : 'CheckInQuestionAnswer';
        cache.modify({
          id: cache.identify({ id: submissionId, __typename: typename }),
          fields: {
            grade: (existing) =>
              cache.writeFragment({
                id: `SubmissionGrade:${data?.gradeCheckInSubmission.submissionGrade.id}`,
                data: data?.gradeCheckInSubmission.submissionGrade,
                fragment: gql(`
                fragment Grade on SubmissionGrade {
                  id
                  status
                  lastGradedBy {
                    firstName
                    lastName
                  }
                }
              `),
              }) ?? existing,
          },
        });
        cache.modify({
          id: cache.identify({ id: projectId, __typename: 'Task' }),
          fields: {
            checkInGroups(checkInGroups = []) {
              return checkInGroups.forEach((group: TCheckInGroup) => ({
                ...group,
                questions: reduceGradingNeededCount(group.questions, checkInQuestionId),
              }));
            },
            checkInQuestions(checkInQuestions = []) {
              return reduceGradingNeededCount(checkInQuestions, checkInQuestionId);
            },
          },
        });
      },
    });

  return [gradeCheckin, { loading }] as const;
};

export type { TGradeSubmissionMutationData, TGradeSubmisisonMutationVariables };

export default useGradeCheckin;
