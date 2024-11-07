import { useParams } from 'react-router-dom';

import { TProductSubmission } from '@pbl/graphql/user/queries/productSubmissionToGrade';
import useProductSubmission from '@pbl/hooks/useProductSubmission';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { groupFilesByDate } from '@pbl/utils/groupTeamFilesByDate';

import { SubmissionList } from '@shared/components/Submissions';
import FileItem from '@shared/components/FileList/FileItem/FileItem';
import FileList from '@shared/components/FileList/FileList';

import { useGradingContext } from '../GradingContext';

import styles from './GradingProductFiles.module.sass';

type Props = {
  submission: TProductSubmission | null;
};

export const ProductList = ({ submission }: Props) => {
  const { teamId, studentId, productId } =
    useParams<{ teamId?: string; studentId?: string; productId: string }>();
  const {
    userInfo: { uuid },
  } = useUserInfo();
  const {
    navigation: { projectId, isTeamGrading },
  } = useGradingContext();
  const { files, isMutationLoading, isFilePickLoading, handleArchiveFile } = useProductSubmission(
    submission,
    {
      productId,
      projectId,
      teamId,
      studentId,
      isUser: true,
    }
  );

  if (!submission) {
    return null;
  }

  if (isTeamGrading) {
    return (
      <div className={styles.productListWrapper}>
        <SubmissionList
          fullWidth={true}
          submissions={groupFilesByDate(submission.files).map((file) => ({
            ...file,
            content: file.content.map((fileItself) => (
              <FileItem
                key={fileItself.id}
                archiveDisabled={false}
                file={fileItself}
                rounded={true}
                variant={file.author.uuid === uuid ? 'primary' : 'light'}
                withoutBorder={true}
                onArchive={handleArchiveFile}
              />
            )),
          }))}
          userUuid={uuid}
          variant='light'
        />
      </div>
    );
  }

  return (
    <FileList
      canArchiveAllFiles={true}
      files={files}
      isUploading={isFilePickLoading}
      loading={isMutationLoading}
      rounded={true}
      onArchive={handleArchiveFile}
    />
  );
};
