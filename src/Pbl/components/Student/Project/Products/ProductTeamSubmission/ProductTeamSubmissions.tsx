import { useParams } from 'react-router-dom';
import { isEmpty, isNull } from 'lodash-es';

import { TProductSubmission } from '@pbl/graphql/student/queries/projectProducts';
import useUserInfo from '@pbl/hooks/useUserInfo';
import useProductSubmission from '@pbl/hooks/useProductSubmission';

import { groupFilesByDate } from '@shared/utils/groupFilesByDate';
import { SubmissionList } from '@shared/components/Submissions';
import FileItem from '@shared/components/FileList/FileItem/FileItem';
import FilesUploadSection from '@shared/components/FileUpload/FileUpload';

import { ProductSubmissionFooter } from '../ProductSubmissionFooter';

import styles from './ProductTeamSubmissions.module.sass';

type Props = {
  productId: string;
  submission: TProductSubmission | null;
  openModal: () => void;
};

type Params = {
  projectId: string;
  teamId?: string;
};

export const ProductTeamSubmissions = ({ productId, submission, openModal }: Props) => {
  const { projectId, teamId } = useParams<Params>();
  const {
    userInfo: { uuid },
  } = useUserInfo();

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
    teamId,
  });

  const newTeamMember = !isNull(submission) && !submission.canSubmit;
  const isButtonDisabled = isEmpty(files);

  const parsedFiles = groupFilesByDate(files)
    .reverse()
    .map((file) => ({
      ...file,
      content: (
        <ul className={styles.fileList}>
          {file.content.map((fileItself) => {
            const canDeleteFile = fileItself.submitter.uuid === uuid;

            const isCurrentUser = fileItself.submitter?.uuid === uuid;

            return (
              <FileItem
                key={fileItself.id}
                archiveDisabled={!canDeleteFile}
                file={fileItself}
                variant={isCurrentUser ? 'primary' : 'light'}
                withoutBorder={true}
                onArchive={handleArchiveFile}
              />
            );
          })}
        </ul>
      ),
    }));

  return (
    <div className={styles.wrapper}>
      {newTeamMember && (
        <SubmissionList fullWidth={true} submissions={parsedFiles} userUuid={uuid} />
      )}
      {!newTeamMember && (
        <FilesUploadSection onFilePick={onFilePick} onGoogleFilePick={onGoogleFilePick}>
          <SubmissionList fullWidth={true} submissions={parsedFiles} userUuid={uuid} />
        </FilesUploadSection>
      )}
      <ProductSubmissionFooter
        disabled={isButtonDisabled}
        isLoading={isFilePickLoading || isMutationLoading}
        newTeamMember={newTeamMember}
        openModal={openModal}
        submission={submission}
      />
    </div>
  );
};
