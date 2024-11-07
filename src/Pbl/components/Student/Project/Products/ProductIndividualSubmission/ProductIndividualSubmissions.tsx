import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { TProductSubmission } from '@pbl/graphql/student/queries/projectProducts';
import useProductSubmission from '@pbl/hooks/useProductSubmission';

import FilesUploadSection from '@shared/components/FileUpload/FileUpload';
import FileList from '@shared/components/FileList/FileList';

import { ProductSubmissionFooter } from '../ProductSubmissionFooter';

import styles from './ProductIndividualSubmissions.module.sass';

type Props = {
  uuid: string;
  productId: string;
  submission: TProductSubmission | null;
  openModal: () => void;
  fileListClassName?: string;
  disabled?: boolean;
};

export const ProductIndividualSubmissions = ({
  uuid,
  productId,
  submission,
  disabled,
  openModal,
  fileListClassName,
}: Props) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    files,
    isFilePickLoading,
    isMutationLoading,
    onFilePick,
    onGoogleFilePick,
    handleArchiveFile,
  } = useProductSubmission(submission, {
    productId,
    projectId,
  });

  const isButtonDisabled = isEmpty(files);

  return (
    <div className={styles.wrapper}>
      <FilesUploadSection
        disabled={disabled}
        onFilePick={onFilePick}
        onGoogleFilePick={onGoogleFilePick}
      />
      {uuid && (
        <FileList
          className={fileListClassName}
          files={files}
          loading={isMutationLoading}
          rounded={true}
          userUuid={uuid}
          onArchive={handleArchiveFile}
        />
      )}
      <ProductSubmissionFooter
        disabled={Boolean(isButtonDisabled || disabled)}
        isLoading={isFilePickLoading || isMutationLoading}
        openModal={openModal}
        submission={submission}
      />
    </div>
  );
};
