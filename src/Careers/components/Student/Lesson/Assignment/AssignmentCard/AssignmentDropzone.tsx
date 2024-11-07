import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import useUserInfo from '@dc/hooks/useUserInfo';
import { MAX_UPLOAD_SIZE_MB } from '@dc/resources/constants';
import { TAssignment } from '@dc/components/Student/Lesson/types';
import { useCreateSubmission } from '@dc/graphql/student/hooks/useCreateSubmission';
import { useArchiveSubmission } from '@dc/graphql/student/hooks/useArchiveSubmission';
import { useCreateSubmissionGoogle } from '@dc/graphql/student/hooks/useCreateSubmissionGoogle';
import { ASSIGNMENT_SUBMISSION_TYPES } from '@dc/resources/enums';

import FileList from '@shared/components/FileList/FileList';
import FilesUploadSection from '@shared/components/FileUpload/FileUpload';
import { GoogleUploadHandlerData } from '@shared/resources/types';

import styles from './AssignmentCard.module.sass';

type Props = {
  contextId: string;
  assignment: TAssignment;
  disabled?: boolean;
};
const MAX_FILES_COUNT = 10;

export const AssignmentDropzone = ({ assignment, disabled, contextId }: Props) => {
  const { opportunityId, lessonId } = useParams<{ opportunityId?: string; lessonId: string }>();
  const { t } = useTranslation();
  const { userInfo } = useUserInfo();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contextType = opportunityId
    ? ASSIGNMENT_SUBMISSION_TYPES.VIRTUAL_INTERNSHIP
    : ASSIGNMENT_SUBMISSION_TYPES.COURSE;

  const [createSubmissionHook, files, setFiles, isUploading] = useCreateSubmission({
    assignment,
    lessonId,
    contextId,
    contextType,
    opportunityId,
  });

  const [createGoogleSubmissionHook] = useCreateSubmissionGoogle({
    assignment,
    lessonId,
    files,
    setFiles,
    contextId,
    contextType,
    opportunityId,
  });

  const [archiveSubmissionHook, pendingDeletion] = useArchiveSubmission({
    contextId,
    lessonId,
    isVirtualInternship: !!opportunityId,
    opportunityId,
  });

  const validateFiles = (files: File[]) => {
    if (files.length > MAX_FILES_COUNT) {
      setErrorMessage(t('student.lesson.assignment.tooManyFilesMessage'));

      return false;
    }

    const validations = files.map((file) => {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

      if (Number(sizeInMB) > MAX_UPLOAD_SIZE_MB) {
        setErrorMessage(t('student.lesson.assignment.tooBigFile'));

        return false;
      }

      return true;
    });

    const allValidationPassed = validations.every((validation) => validation);

    return allValidationPassed;
  };

  const onFilePick = async (selectedFiles: File[]) => {
    const isValid = validateFiles(selectedFiles);
    if (isValid) {
      await createSubmissionHook(selectedFiles);
    }
  };

  const onGoogleFilePick = async ({ data, token }: GoogleUploadHandlerData) => {
    await createGoogleSubmissionHook({ data, token });
  };

  const handleArchiveFile = async (id: string) => {
    await archiveSubmissionHook({ id });
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const fileTypeValidator = (file: File) => {
    const notAcceptedFileType = /^.*\.(gdoc|gdraw|gform|gmap|gsheet|gslides|gtable)$/i;
    const notValidFiletype = notAcceptedFileType.test(file.name);

    setErrorMessage('');

    if (notValidFiletype) {
      setErrorMessage(t('student.lesson.assignment.gdocFileTypeNotAccepted'));

      return {
        code: 'not-accepted',
        message: t('student.lesson.assignment.gdocFileTypeNotAccepted'),
      };
    }

    return null;
  };

  return (
    <div className={styles.filesUploadSection}>
      <div className={styles.dropzoneWrapper}>
        <FilesUploadSection
          disabled={disabled}
          validator={fileTypeValidator}
          onFilePick={onFilePick}
          onGoogleFilePick={onGoogleFilePick}
        />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
      <FileList
        canArchiveAllFiles={true}
        files={files}
        isUploading={isUploading}
        loading={pendingDeletion}
        rounded={true}
        userUuid={userInfo?.uuid}
        onArchive={handleArchiveFile}
      />
    </div>
  );
};
