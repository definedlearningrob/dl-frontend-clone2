import { gql, useMutation } from '@apollo/client';

import CREATE_SUBMISSION, {
  CreateProductSubmissionData,
  CreateProductSubmissionVariables,
} from '../mutations/createProductSubmission';

const useCreateProductSubmission = (options: {
  projectId: string;
  productId: string;
  teamId?: string;
}) => {
  const [mutate, { loading }] = useMutation<
    CreateProductSubmissionData,
    CreateProductSubmissionVariables
  >(CREATE_SUBMISSION, {
    variables: {
      input: { productId: options.productId, taskId: options.projectId, teamId: options.teamId },
    },
  });

  const createSubmission = () =>
    mutate({
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify({ id: options.productId, __typename: 'Product' }),
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
export default useCreateProductSubmission;
