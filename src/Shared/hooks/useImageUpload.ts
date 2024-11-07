import { useMutation } from '@apollo/client';

import { fileUpload } from '@shared/services/aws';
import GENERATE_PRESIGNED_UPLOAD_URL from '@shared/graphql/shared/mutations/generatePresignedUploadUrl';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';

export const useImageUpload = () => {
  const [getPresignedUrl] = useMutation(GENERATE_PRESIGNED_UPLOAD_URL);

  const uploadImage = async (image: File, resourceClass: RESOURCE_CLASS) => {
    try {
      const response = await fileUpload(image, getPresignedUrl, resourceClass, ASSET_TYPE.IMAGE);

      await response?.promise;

      return {
        imageFilename: response.file.name,
        imageUuid: response.uuid,
      };
    } catch (error) {
      throw new Error('Failed to upload image' + error);
    }
  };

  return [uploadImage] as const;
};
