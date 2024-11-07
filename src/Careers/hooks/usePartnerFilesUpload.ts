import {
  useCreatePartnerFileMutation,
  useGeneratePresignedUploadUrlMutation,
} from '@graphql/dc/users/hooks';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';
import { fileUpload } from '@shared/services/aws';
import { handleError } from '@shared/utils/handleError';

export const usePartnerFilesUpload = () => {
  const { t } = useTranslation();
  const [generatePresignedUrl] = useGeneratePresignedUploadUrlMutation();
  const [createPartnerFile] = useCreatePartnerFileMutation();
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = async (files: File[], partnerId: string) => {
    try {
      setIsUploading(true);
      await Promise.all(
        files.map(async (file) => {
          const response = await fileUpload(
            file,
            generatePresignedUrl,
            RESOURCE_CLASS.PARTNER_FILE,
            ASSET_TYPE.FILE
          );

          await response.promise;

          await createPartnerFile({
            variables: {
              input: { fileUuid: response.uuid, fileFilename: response.file.name, partnerId },
            },
            update(cache, { data }) {
              cache.modify({
                id: cache.identify({ __typename: 'Partner', id: partnerId }),
                fields: {
                  documents(existingDocuments = [], { toReference }) {
                    const newPartnerId = data?.createPartnerFile?.partnerFile?.id;

                    if (!newPartnerId) {
                      return existingDocuments;
                    }

                    return [
                      ...existingDocuments,
                      toReference({ __typename: 'PartnerFile', id: newPartnerId }),
                    ];
                  },
                },
              });
            },
          });
        })
      );
      setIsUploading(false);
    } catch (error) {
      handleError(error, t('partners.documentationUploadError'));
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading };
};
