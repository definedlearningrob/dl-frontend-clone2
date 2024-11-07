import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import { removeFromCache } from '@shared/utils/graphql';

import DELETE_SUBMISSION_FILE, {
  DeleteProductSubmissionFileData,
  DeleteProductSubmissionFileVariables,
} from '../mutations/deleteProductSubmissionFile';

const useDeleteProductSubmissionFile = () => {
  const [mutate, { loading }] = useMutation<
    DeleteProductSubmissionFileData,
    DeleteProductSubmissionFileVariables
  >(DELETE_SUBMISSION_FILE);

  const deleteSumbissionFile = (fileId: string) =>
    mutate({
      variables: { input: { id: fileId } },
      update: (cache, { data }) => {
        const submissionData = data?.deleteProductSubmissionFile.productSubmission;
        removeFromCache({ id: fileId, __typename: 'ProductSubmissionFile' });

        if (isEmpty(submissionData?.files) && submissionData?.grade === null) {
          cache.modify({
            id: cache.identify({
              id: submissionData?.productId,
              __typename: 'Product',
            }),
            fields: {
              submission() {
                return null;
              },
            },
          });

          removeFromCache({ id: submissionData?.id, __typename: 'ProductSubmission' });
        }
      },
    });

  return [deleteSumbissionFile, { loading }] as const;
};
export default useDeleteProductSubmissionFile;
