import { useMutation } from '@apollo/client';

import GENERATE_PRESIGNED_URL, {
  GeneratePresignedUploadUrlData,
  GeneratePresignedUploadUrlVariables,
} from '../shared/mutations/generatePresignedUploadUrl';

const useGeneratePresignedUploadUrl = () => {
  const response = useMutation<GeneratePresignedUploadUrlData, GeneratePresignedUploadUrlVariables>(
    GENERATE_PRESIGNED_URL
  );

  return response;
};
export default useGeneratePresignedUploadUrl;
