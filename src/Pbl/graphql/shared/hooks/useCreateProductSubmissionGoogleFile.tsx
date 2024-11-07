import { useMutation } from '@apollo/client';

import CREATE_GOOGLE_SUBMISSION_FILE, {
  CreateProductSubmissionFileFromGoogleData,
  CreateProductSubmissionFileFromGoogleVariables,
} from '../mutations/createProductSubmissionFileGoogle';

const useCreateProductSubmissionGoogleFile = () => {
  const [mutate, { loading }] = useMutation<
    CreateProductSubmissionFileFromGoogleData,
    CreateProductSubmissionFileFromGoogleVariables
  >(CREATE_GOOGLE_SUBMISSION_FILE);

  const createProductSubmissionGoogleFile = (token: string, fileId: string, submissionId: string) =>
    mutate({
      variables: {
        input: {
          accessToken: token,
          fileId,
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
              return [
                ...cachedSettings,
                data?.createProductSubmissionFileFromGoogleDrive.productSubmissionFile,
              ];
            },
          },
        });
      },
    });

  return [createProductSubmissionGoogleFile, { loading }] as const;
};

export default useCreateProductSubmissionGoogleFile;
