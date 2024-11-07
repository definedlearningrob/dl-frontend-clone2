import { useMutation } from '@apollo/client';

import UNASSIGN_TEAMS_FROM_TASK, {
  TUnassignTeamsFromTaskData,
  TUnassignTeamsFromTaskVariables,
  TUnassignTeamsFromTaskInput,
} from '@pbl/graphql/user/mutations/unassignTeamsFromTask';
import SCHOOL_CLASSES from '@pbl/graphql/user/queries/schoolClasses';

type Props = Omit<TUnassignTeamsFromTaskInput, 'taskId'>;

export const useUnassignTeamsFromTask = (taskId: string) => {
  const [mutate, { loading, error }] = useMutation<
    TUnassignTeamsFromTaskData,
    TUnassignTeamsFromTaskVariables
  >(UNASSIGN_TEAMS_FROM_TASK);

  const unassignTeamsFromTask = ({ teamUuids }: Props) =>
    mutate({
      variables: {
        input: {
          taskId,
          teamUuids,
        },
      },
      refetchQueries: [{ query: SCHOOL_CLASSES, variables: { projectId: taskId } }],
    });

  return [unassignTeamsFromTask, { loading, error }] as const;
};
