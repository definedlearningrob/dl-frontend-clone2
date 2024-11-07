import { useMutation } from '@apollo/client';

import GENERATE_PRESIGNED_UPLOAD_URL, {
  TGeneratePresignedUploadUrlData,
  TGeneratePresignedUploadUrlMutationVariables,
} from '@shared/graphql/student/mutations/generatePresignedUploadUrl';

export const useGeneratePresignedUploadUrlMutation = () => {
  const [mutate, { error, loading }] = useMutation<TGeneratePresignedUploadUrlData>(
    GENERATE_PRESIGNED_UPLOAD_URL
  );

  const generatePresignedUploadUrl = ({
    variables,
  }: TGeneratePresignedUploadUrlMutationVariables) =>
    mutate({
      variables,
    });

  return [generatePresignedUploadUrl, { error, loading }] as const;
};
