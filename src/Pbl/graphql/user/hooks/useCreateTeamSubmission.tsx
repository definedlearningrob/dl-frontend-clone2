import { gql, useMutation } from '@apollo/client';

import CREATE_SUBMISSION, {
  CreateTeamSubmissionData,
  CreateTeamSubmissionVariables,
} from '../mutations/createTeamSubmission';

export const useCreateTeamSubmission = (projectId: string, productId: string, teamUuid: string) => {
  const [mutate, { loading }] = useMutation<
    CreateTeamSubmissionData,
    CreateTeamSubmissionVariables
  >(CREATE_SUBMISSION, { variables: { input: { productId, taskId: projectId, teamUuid } } });

  const createSubmission = () =>
    mutate({
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify({ id: productId, __typename: 'Product' }),
          fields: {
            submission: (existing) =>
              cache.writeFragment({
                id: 'ProductSubmission:' + data?.createProductSubmission.productSubmission.id,
                data: { id: data?.createProductSubmission.productSubmission.id },
                fragment: gql(`
                fragment Submission on ProductSubmission {
                  id
                }
              `),
              }) ?? existing,
          },
        });
      },
    });

  return [createSubmission, { loading }] as const;
};
