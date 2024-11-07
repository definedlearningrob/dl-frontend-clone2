import { useMutation } from '@apollo/client';

import ASSIGN_TEAMS_TO_TASK, {
  TAssignTeamsToTaskData,
  TAssignTeamsToTaskInput,
  TAssignTeamsToTaskVariables,
} from '@pbl/graphql/user/mutations/assignTeamsToTask';
import SCHOOL_CLASSES from '@pbl/graphql/user/queries/schoolClasses';

type Props = Omit<TAssignTeamsToTaskInput, 'taskId'>;

export const useAssignTeamsToTask = (taskId: string) => {
  const [mutate, { loading, error }] = useMutation<
    TAssignTeamsToTaskData,
    TAssignTeamsToTaskVariables
  >(ASSIGN_TEAMS_TO_TASK);

  const assignTeamsToTask = async ({ teamUuids }: Props) =>
    mutate({
      variables: {
        input: {
          taskId,
          teamUuids,
        },
      },
      refetchQueries: [{ query: SCHOOL_CLASSES, variables: { projectId: taskId } }],
    });

  return [assignTeamsToTask, { loading, error }] as const;
};
