import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDeletePartnerFileMutation, usePartnerOverviewQuery } from '@graphql/dc/users/hooks';
import { Reference } from '@apollo/client';
import { isUndefined } from 'lodash-es';

import { usePartnerFilesUpload } from '@dc/hooks/usePartnerFilesUpload';

import FileList from '@shared/components/FileList/FileList';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { handleError } from '@shared/utils/handleError';
import { callToast } from '@shared/components/Toaster/Toaster';
import DropableArea from '@shared/components/DropableArea/DropableArea';

import { PartnerCardContentWrapper } from '../PartnerCardContentWrapper';

import { PartnerDocumentationSkeleton } from './PartnerDocumentationSkeleton';
import { EmptyPartnerDocumentation } from './EmptyPartnerDocumentation';

export const PartnerDocumentation = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = usePartnerOverviewQuery({ variables: { id } });
  const { uploadFiles, isUploading } = usePartnerFilesUpload();
  const [deletePartnerFile] = useDeletePartnerFileMutation();

  const handleArchiveFile = async (documentId: string) => {
    try {
      await deletePartnerFile({
        variables: { input: { id: documentId } },
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: 'Partner', id }),
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
      callToast('success', t('partners.fileDeleteSuccess'));
    } catch (error) {
      handleError(error, t('partners.fileDeleteError'));
    }
  };

  const handleUploadFiles = async (files: File[]) => {
    uploadFiles(files, id);
  };

  const documents = data?.partner.documents;
  const canEdit = data?.partner.canEdit;

  const documentsCount = documents?.length;
  const hasDocuments = !!documentsCount;

  const documentationoLabelKey = isUndefined(documentsCount)
    ? 'partners.documentation'
    : 'partners.documentationWithCount';

  return (
    <PartnerCardContentWrapper
      header={
        <Trans
          components={{ neutralText: <span className='text-neutral-600' /> }}
          i18nKey={documentationoLabelKey}
          values={{ count: documentsCount }}
        />
      }>
      {!loading && !hasDocuments ? (
        <EmptyPartnerDocumentation />
      ) : (
        <div className='px-base xxxl:px-md py-sm xxxl:py-base flex flex-col gap-base xxxl:gap-md'>
          {canEdit && (
            <DropableArea
              className='!p-0 h-[220px] xxxl:h-[420px]'
              multiple={true}
              onDrop={handleUploadFiles}
            />
          )}
          <div>
            {loading && <PartnerDocumentationSkeleton />}
            {hasDocuments && (
              <FileList
                canArchiveAllFiles={true}
                className='!gap-x xxxl:!gap-sm'
                files={documents}
                rounded={true}
                showDate={true}
                showSubmitter={true}
                variant='light'
                onArchive={canEdit ? handleArchiveFile : undefined}
              />
            )}
            {isUploading && (
              <SkeletonRectangle
                className='!h-[78px] xxxl:!h-[83px] mt-x xxxl:mt-sm'
                radius='sm'
                size='full-width'
              />
            )}
          </div>
        </div>
      )}
    </PartnerCardContentWrapper>
  );
};
