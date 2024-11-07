/* eslint-disable react/no-danger */
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApolloError, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { TFile } from '@pbl/graphql/user/queries/project';
import { useCreateTaskFile } from '@pbl/graphql/user/hooks/useCreateTaskFile';

import Card from '@shared/components/Card/Card';
import SharedDropableArea from '@shared/components/DropableArea/DropableArea';
import { fileUpload } from '@shared/services/aws';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';
import { callToast } from '@shared/components/Toaster/Toaster';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { removeFromCache } from '@shared/utils/graphql';
import { DELETE_TASK_FILE } from '@shared/graphql/user/mutations/deleteTaskFile';
import SharedModal from '@shared/components/Modal/Modal';

import FileItem from './FileItem/FileItem';

type Props = {
  files: TFile[];
  isEditing: boolean;
};

export const ProjectFiles = ({ files, isEditing }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();
  const sortedFiles = useMemo(() => [...files].sort((a, b) => +a.step - +b.step), [files]);
  const [getPresignedUrl, { loading: presignedLoading }] = useGeneratePresignedUploadUrl();
  const [createTaskFile] = useCreateTaskFile();
  const [deleteTaskFile] = useMutation(DELETE_TASK_FILE);
  const [fileToDelete, setFileToDelete] = useState<TFile | null>(null);

  const closeModal = () => {
    setFileToDelete(null);
  };

  const handleFilesUpload = async (files: File[]) => {
    try {
      await Promise.all(
        files.map(async (file) => {
          const sizeInMB = +(file.size / (1024 * 1024)).toFixed(2);
          if (sizeInMB > 20) {
            callToast('error', t('validation.files.tooBigFile', { size: '20MB' }));

            return;
          }

          const response = await fileUpload(
            file,
            getPresignedUrl,
            RESOURCE_CLASS.TASK_FILE,
            ASSET_TYPE.FILE
          );
          await response.promise;

          await createTaskFile(response.file.name, response.uuid, projectId);
        })
      );
      callToast('success', t('project.fileAttachedSucessfully', { count: files.length }));
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  const handleFileDelete = async () => {
    if (fileToDelete) {
      try {
        await deleteTaskFile({
          variables: {
            input: {
              id: fileToDelete.id,
            },
          },
          update: removeFromCache({ id: fileToDelete.id, __typename: 'TaskFile' }),
        });
        callToast('success', t('project.fileDeletedSucessfully'));
      } catch (error) {
        callToast('error', t('common.notifications.error.generic'));
      }
    }

    closeModal();
  };

  return (
    <>
      <Card dataTestId='user-project-files'>
        <Card.Header>
          <Card.Title size='medium'>{t('project.filesDownloads')}</Card.Title>
        </Card.Header>
        <p data-testid='user-project-files-description'>{t('project.filesHeading')}</p>
        {isEditing && (
          <div className='mb-base'>
            <SharedDropableArea
              accept='.pdf, .doc, .docs, .docx, .xls, .xlsx, .csv, .txt, .rtf, .html, .zip, .mp3. .wma, .mpg, .flv, .avi, .jpg, .jpeg, .png, .gif, .mp4, .ppt, .pptx, .webm'
              assetType='file'
              isLoading={presignedLoading}
              multiple={true}
              onDrop={handleFilesUpload}
            />
            <p className='flex gap-xs text-xxs text-font-secondary mt-xs'>
              <IconContainer Icon={InfoIcon} paddingSize='none' size='sm' />
              {t('project.supportedFileFormats')}
            </p>
          </div>
        )}
        {!isEmpty(files) && (
          <ul>
            {sortedFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                isEditing={isEditing}
                onDelete={() => setFileToDelete(file)}
              />
            ))}
          </ul>
        )}
      </Card>
      {fileToDelete && (
        <SharedModal isOpen={!!fileToDelete.id} onDismiss={closeModal}>
          <SharedModal.Header>
            <SharedModal.Heading>{t('fileDeleteConfirmation.heading')}</SharedModal.Heading>
          </SharedModal.Header>
          <SharedModal.Body>
            <p>{t('fileDeleteConfirmation.text', { fileNameToDelete: fileToDelete.filename })}</p>
          </SharedModal.Body>
          <SharedModal.Footer>
            <div className='flex gap-sm'>
              <SharedModal.Button
                data-testid='archive-modal-cancel'
                variant='primary-outlined'
                onClick={closeModal}>
                {t('common.actions.cancel')}
              </SharedModal.Button>
              <SharedModal.Button
                className='image-input__preview-button'
                data-testid='archive-modal-accept'
                variant='danger'
                onClick={handleFileDelete}>
                {t('common.actions.delete')}
              </SharedModal.Button>
            </div>
          </SharedModal.Footer>
        </SharedModal>
      )}
    </>
  );
};
