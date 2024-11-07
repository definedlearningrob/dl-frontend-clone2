import { PartnerFile } from '@graphql/dc/users/types';
import { differenceBy, isEmpty } from 'lodash-es';
import { useDeletePartnerFileMutation } from '@graphql/dc/users/hooks';
import { Reference } from '@apollo/client';

import { usePartnerFilesUpload } from '@dc/hooks/usePartnerFilesUpload';

import { handleError } from '@shared/utils/handleError';

export type DocumentFile = Pick<PartnerFile, 'filename' | 'createdAt' | 'url' | 'id'> & {
  submitter: Pick<PartnerFile['submitter'], 'uuid' | 'firstName' | 'lastName'>;
};

export type NewDocumentFile = { file: File; src: string; createdAt: string };

type SaveDocumentsParams = {
  documents: DocumentFile[];
  newDocuments: NewDocumentFile[];
  initialDocuments: DocumentFile[];
  partnerId: string;
};

export const useSavePartnerDocuments = () => {
  const { uploadFiles } = usePartnerFilesUpload();
  const [deletePartnerFile] = useDeletePartnerFileMutation();

  const archiveFile = async (documentId: string, partnerId: string) => {
    deletePartnerFile({
      variables: { input: { id: documentId } },
      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: 'Partner', id: partnerId }),
          fields: {
            documents(existingDocuments = [], { readField }) {
              return existingDocuments.filter(
                (documentRef: Reference) => documentId !== readField('id', documentRef)
              );
            },
          },
        });
      },
    });
  };

  const saveDocuments = async ({
    documents,
    newDocuments,
    initialDocuments,
    partnerId,
  }: SaveDocumentsParams) => {
    try {
      const documentsToArchive = differenceBy(initialDocuments, documents, 'id');
      const documentsToUpload = newDocuments.map(({ file }) => file);

      await Promise.all(documentsToArchive.map(({ id }) => archiveFile(id, partnerId)));
      if (!isEmpty(documentsToUpload)) {
        await uploadFiles(documentsToUpload, partnerId);
        newDocuments.forEach((document) => URL.revokeObjectURL(document.src));
      }
    } catch (error) {
      handleError(error);
    }
  };

  return { saveDocuments };
};
