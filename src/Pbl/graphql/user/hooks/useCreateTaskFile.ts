import { useMutation } from '@apollo/client';

import { CREATE_TASK_FILE } from '@dc/graphql/user/mutations/createTaskFile';

export const useCreateTaskFile = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_TASK_FILE);

  const createTaskFile = async (filename: string, fileUuid: string, taskId: string) => {
    mutate({
      variables: {
        input: {
          fileFilename: filename,
          fileUuid,
          taskId,
        },
      },
      notifyOnNetworkStatusChange: true,
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({
            id: taskId,
            __typename: 'Task',
          }),
          fields: {
            files(existingFiles = [], { toReference }) {
              const createdFile = data?.createTaskFile.taskFile;

              return [
                ...existingFiles,
                toReference({ __typename: 'TaskFile', id: createdFile?.id }),
              ];
            },
          },
        });
      },
    });
  };

  return [createTaskFile, { loading, error }] as const;
};
