import { useParams } from 'react-router-dom';

import { useCreateCheckInQuestionAnswer } from '@pbl/graphql/student/hooks/useCreateCheckInQuestionAnswer';
import { useUpdateCheckInQuestionAnswer } from '@pbl/graphql/student/hooks/useUpdateCheckInQuestionAnswer';
import { useCreateTeamCheckInQuestionAnswer } from '@pbl/graphql/student/hooks/useCreateTeamCheckInQuestionAnswer';
import { useUpdateTeamCheckInQuestionAnswer } from '@pbl/graphql/student/hooks/useUpdateTeamCheckInQuestionAnswer';
import { TCheckInQuestion } from '@pbl/components/Project/types';
import { useCreateTeamCheckInSubmission } from '@pbl/graphql/student/hooks/useCreateTeamCheckInSubmission';

type Props = {
  checkInQuestion: TCheckInQuestion;
};

type CreateFormValues = {
  answer: string;
};

type EditFormValues = {
  id: string;
  answer: string;
};

export const useSubmitCheckInQuestionAnswer = ({ checkInQuestion }: Props) => {
  const { projectId, teamId } = useParams<{ projectId: string; teamId?: string }>();

  const [createStudentCheckInAnswer, { loading: isCreateAnswerLoading }] =
    useCreateCheckInQuestionAnswer(projectId);
  const [updateStudentCheckInAnswer, { loading: isUpdateAnswerLoading }] =
    useUpdateCheckInQuestionAnswer();

  const [createTeamCheckInAnswer, { loading: isCreateTeamAnswerLoading }] =
    useCreateTeamCheckInQuestionAnswer();
  const [updateTeamCheckInAnswer, { loading: isUpdateTeamAnswerLoading }] =
    useUpdateTeamCheckInQuestionAnswer();

  const [createTeamCheckInSubmission] = useCreateTeamCheckInSubmission();

  const handleCreateTeamCheckInAnswer = async (values: CreateFormValues) => {
    if (!checkInQuestion.teamSubmission) {
      const teamSubmissionResponse = await createTeamCheckInSubmission({
        checkInQuestionId: checkInQuestion.id,
        taskId: projectId,
        teamId: teamId!,
      });
      const teamSubmissionId =
        teamSubmissionResponse.data?.createTeamCheckInSubmission.teamCheckInSubmission.id;

      await createTeamCheckInAnswer({
        id: teamSubmissionId!,
        answer: values.answer,
      });
    } else {
      createTeamCheckInAnswer({
        id: checkInQuestion.teamSubmission.id,
        answer: values.answer,
      });
    }
  };

  const createCheckInAnswer = async (values: CreateFormValues) => {
    if (teamId) {
      handleCreateTeamCheckInAnswer(values);
    } else {
      createStudentCheckInAnswer({ answer: values.answer, id: checkInQuestion.id });
    }
  };

  const updateCheckInAnswer = (values: EditFormValues) => {
    if (teamId) {
      updateTeamCheckInAnswer({ ...values, teamSubmissionId: checkInQuestion.teamSubmission!.id });
    } else {
      updateStudentCheckInAnswer(values);
    }
  };

  const submitCheckInAnswer = (values: CreateFormValues | EditFormValues) => {
    if ('id' in values) {
      updateCheckInAnswer(values);
    } else {
      createCheckInAnswer(values);
    }
  };

  const isLoading =
    isCreateAnswerLoading ||
    isUpdateAnswerLoading ||
    isCreateTeamAnswerLoading ||
    isUpdateTeamAnswerLoading;

  return [submitCheckInAnswer, { loading: isLoading }] as const;
};
