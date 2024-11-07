import { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import createResumeMutation from '@dc/graphql/student/mutations/createResume';

import FileList from '@shared/components/PortfolioResume/UploadModal/FileList/FileList';
import DropZone from '@shared/components/PortfolioResume/UploadModal/DropZone/DropZone';
import SharedModal from '@shared/components/Modal/Modal';
import { FileItem } from '@shared/components/PortfolioResume/types';
import portfolioResumesQuery, {
  TPortfolioResumesData,
} from '@shared/graphql/student/query/portfolioResumes';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  closeModal: () => void;
};

export function ResumeUploadModal({ closeModal }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isSavePending, setSavePending] = useState(false);
  const { t } = useTranslation();
  const [createResume] = useMutation(createResumeMutation);

  const isUploadCompleted = useMemo(
    () => Boolean(files.length) && files.every((file) => file.isUploaded),
    [files]
  );

  const handleResumeUpload = async () => {
    setSavePending(true);

    try {
      Promise.all(
        files.map((file) =>
          createResume({
            variables: {
              input: {
                fileFilename: file.filename,
                fileUuid: file.uuid,
              },
            },
            update: (cache, { data: { createResume: { newResume = {} } = {} } }) => {
              const cachedResumes = cache.readQuery<TPortfolioResumesData>({
                query: portfolioResumesQuery,
              });

              cache.writeQuery({
                query: portfolioResumesQuery,
                data: {
                  portfolio: {
                    resumes: [...[cachedResumes && cachedResumes.portfolio.resumes], newResume],
                    studentId: cachedResumes && cachedResumes.portfolio.studentId,
                  },
                },
              });
            },
          })
        )
      );

      callToast(
        'success',
        t('notifications.success.created', { name: t('portfolioResume.heading') })
      );

      closeModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setSavePending(false);
    }
  };

  return (
    <SharedModal isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('portfolioResume.modalHeading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <DropZone files={files} setFiles={setFiles} />
        <FileList files={files} setFiles={setFiles} />
      </SharedModal.Body>
      {/* TODO Temporary hidden - waiting for more upload options */}
      {/* <div className='resume-upload-modal__upload-type-buttons'>
          <SharedUploadTypeButton
            disabled={true}
            icon={<UploadFile />}
            selected={true}
            text={t('portfolioResume.uploadTypes.file')}
          />
        </div> */}
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={closeModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='upload-modal-save-button'
          disabled={!isUploadCompleted || isSavePending}
          isLoading={isSavePending}
          variant='primary'
          onClick={handleResumeUpload}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}
