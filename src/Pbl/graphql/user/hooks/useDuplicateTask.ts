import { ApolloError, useMutation } from '@apollo/client';

import MyProjects from '@pbl/graphql/user/queries/myProjects';
import { DUPLICATE_TASK, TTaskInput } from '@pbl/graphql/user/mutations/duplicateTask';

import { callToast } from '@shared/components/Toaster/Toaster';

export const useDuplicateTask = () => {
  const [mutate, { loading, error }] = useMutation(DUPLICATE_TASK);
  const duplicateTask = async (task: TTaskInput) => {
    try {
      const response = await mutate({
        variables: {
          input: task,
        },
        refetchQueries: [{ query: MyProjects }],
      });

      return response.data;
    } catch (error: (ApolloError | unknown) | Error) {
      callToast('error', error instanceof ApolloError ? error.message : error);
    }
  };

  return { duplicateTask, loading, error };
};
