import { useMutation } from '@apollo/client';

import CREATE_SUBMISSION_FILE, {
  CreateProductSubmissionFileData,
  CreateProductSubmissionFileVariables,
} from '../mutations/createProductSubmissionFile';

const useCreateProductSubmissionFile = () => {
  const [mutate, { loading }] = useMutation<
    CreateProductSubmissionFileData,
    CreateProductSubmissionFileVariables
  >(CREATE_SUBMISSION_FILE);

  const createSubmissionFile = (response: { uuid: string; file: File }, submissionId: string) =>
    mutate({
      variables: {
        input: {
          fileFilename: response.file.name,
          fileUuid: response.uuid,
          productSubmissionId: submissionId,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({
            id: submissionId,
            __typename: 'ProductSubmission',
          }),
          fields: {
            files(cachedSettings) {
              return [...cachedSettings, data?.createProductSubmissionFile.productSubmissionFile];
            },
          },
        });
      },
    });

  return [createSubmissionFile, { loading }] as const;
};
export default useCreateProductSubmissionFile;
