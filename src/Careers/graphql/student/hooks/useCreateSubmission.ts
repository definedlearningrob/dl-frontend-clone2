import { useMutation } from '@apollo/client';
import { compact } from 'lodash-es';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import generatePresignedUploadUrlMutation from '@dc/graphql/student/mutations/generatePresignedUploadUrl';
import createAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/createAssignmentSubmissionFile';
import createAssignmentSubmissionMutation from '@dc/graphql/student/mutations/createAssignmentSubmission';
import { fileUpload } from '@dc/services/aws';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';
import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '@dc/graphql/student/queries/virtualInternshipLesson';
import { TAssignment } from '@dc/components/Student/Lesson/types';
import { ASSIGNMENT_SUBMISSION_TYPES } from '@dc/resources/enums';
import COURSE_LESSON_QUERY from '@dc/graphql/student/queries/lessonInCourse';

import { callToast } from '@shared/components/Toaster/Toaster';

export type TFile = {
  id: string;
  filename: string;
  googleWeblink?: string;
  source: string;
  url: string;
};

type Props = {
  assignment: TAssignment;
  lessonId: string;
  contextId: string;
  contextType: ASSIGNMENT_SUBMISSION_TYPES;
  opportunityId?: string;
};

export const useCreateSubmission = ({
  assignment,
  lessonId,
  contextId,
  contextType,
  opportunityId,
}: Props) => {
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrlMutation);
  const [createFile] = useMutation(createAssignmentSubmissionFileMutation);
  const [createSubmission] = useMutation(createAssignmentSubmissionMutation);
  const [files, setFiles] = useState<TFile[]>(assignment?.submission?.files || []);
  const [isUploading, setIsUploading] = useState(false);
  const { t } = useTranslation();

  const isVirtualInternship = contextType === ASSIGNMENT_SUBMISSION_TYPES.VIRTUAL_INTERNSHIP;

  const getSubmissionId = async () => {
    if (assignment.submission) return assignment.submission.id;

    const response = await createSubmission({
      variables: {
        input: {
          assignmentId: assignment.id,
          contextId,
          contextType,
        },
      },
    });

    return response.data.createAssignmentSubmission.assignmentSubmission.id;
  };

  const createSubmissionHook = async (selectedFiles: File[]) => {
    try {
      const id = await getSubmissionId();

      setIsUploading(true);
      await Promise.all(
        selectedFiles.map(async (file) => {
          const response = await fileUpload(
            file as File,
            getPresignedUrl,
            // @ts-ignore
            RESOURCE_CLASS.ASSIGNMENT_SUBMISSION_FILE,
            ASSET_TYPE.FILE
          );

          await response.promise;

          const {
            data: {
              createAssignmentSubmissionFile: { assignmentSubmissionFile },
            },
          } = await createFile({
            variables: {
              input: {
                fileFilename: response.file.name,
                fileUuid: response.uuid,
                assignmentSubmissionId: id,
              },
            },
            refetchQueries: compact([
              isVirtualInternship && {
                query: VIRTUAL_INTERNSHIP_LESSON_QUERY,
                variables: {
                  opportunityId,
                  lessonId,
                },
              },
              !isVirtualInternship && {
                query: COURSE_LESSON_QUERY,
                variables: {
                  courseId: contextId,
                  lessonId,
                  track: false,
                },
              },
            ]),
            awaitRefetchQueries: true,
          });
          setFiles((prev) => [...prev, assignmentSubmissionFile]);
          callToast('success', t('student.lesson.assignment.submissionFile'));
        })
      );
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      callToast('error', t('student.lesson.assignment.submissionError', { error }));
    }
  };

  return [createSubmissionHook, files, setFiles, isUploading] as const;
};
