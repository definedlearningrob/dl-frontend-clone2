import { gql, useMutation } from '@apollo/client';

import CREATE_SUBMISSION, {
  CreateStudentSubmissionData,
  CreateStudentSubmissionVariables,
} from '../mutations/createStudentSubmission';

const useCreateStudentSubmission = (projectId: string, productId: string, studentUuid: string) => {
  const [mutate, { loading }] = useMutation<
    CreateStudentSubmissionData,
    CreateStudentSubmissionVariables
  >(CREATE_SUBMISSION, { variables: { input: { productId, taskId: projectId, studentUuid } } });

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
export default useCreateStudentSubmission;
