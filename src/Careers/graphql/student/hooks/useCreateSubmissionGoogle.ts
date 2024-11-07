import React, { useState } from 'react';
import { compact, uniqBy } from 'lodash-es';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { TAssignment } from '@dc/components/Student/Lesson/types';
import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '@dc/graphql/student/queries/virtualInternshipLesson';
import createAssignmentSubmissionFileFromGoogleDriveMutation from '@dc/graphql/student/mutations/createAssignmentSubmissionFileFromGoogleDrive';
import createAssignmentSubmissionMutation from '@dc/graphql/student/mutations/createAssignmentSubmission';
import { TFile } from '@dc/graphql/student/hooks/useCreateSubmission';
import { ASSIGNMENT_SUBMISSION_TYPES } from '@dc/resources/enums';
import COURSE_LESSON_QUERY from '@dc/graphql/student/queries/lessonInCourse';

import { GoogleUploadHandlerData } from '@shared/resources/types';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  assignment: TAssignment;
  lessonId: string;
  files: TFile[];
  setFiles: React.Dispatch<React.SetStateAction<TFile[]>>;
  contextId: string;
  contextType: ASSIGNMENT_SUBMISSION_TYPES;
  opportunityId?: string;
};

export const useCreateSubmissionGoogle = ({
  assignment,
  lessonId,
  files,
  setFiles,
  contextId,
  contextType,
  opportunityId,
}: Props) => {
  const [createGoogleSubmission] = useMutation(
    createAssignmentSubmissionFileFromGoogleDriveMutation
  );
  const [createSubmission] = useMutation(createAssignmentSubmissionMutation);
  const [isUploadingGoogle, setIsUploadingGoogle] = useState(false);
  const { t } = useTranslation();

  const isVirtualInternship = contextType === ASSIGNMENT_SUBMISSION_TYPES.VIRTUAL_INTERNSHIP;

  const getSubmissionId = async () => {
    if (assignment.submission) return assignment.submission.id;

    const response = await createSubmission({
      variables: { input: { assignmentId: assignment.id, contextId, contextType } },
    });

    return response.data.createAssignmentSubmission.assignmentSubmission.id;
  };

  const createSubmissionHookGoogle = async ({ data, token }: GoogleUploadHandlerData) => {
    setIsUploadingGoogle(true);

    if (data.action === 'picked') {
      const [firstDoc] = data.docs;
      const googleFile = {
        filename: firstDoc.name,
        id: firstDoc.id,
        size: firstDoc.sizeBytes,
        source: 'google',
        token,
        url: '',
      };

      try {
        const newSubmissionId = assignment.submission?.id
          ? assignment.submission?.id
          : await getSubmissionId();

        const {
          data: {
            createAssignmentSubmissionFileFromGoogleDrive: { assignmentSubmissionFile },
          },
        } = await createGoogleSubmission({
          variables: {
            input: {
              assignmentSubmissionId: newSubmissionId,
              fileId: googleFile.id,
              accessToken: googleFile.token,
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
        setFiles((prev) => uniqBy([...prev, assignmentSubmissionFile], 'id'));
        callToast('success', t('student.lesson.assignment.submissionFile'));
        setIsUploadingGoogle(true);
      } catch (error) {
        callToast('error', t('student.lesson.assignment.submissionError', { error }));
      }
    }
  };

  return [createSubmissionHookGoogle, files, setFiles, isUploadingGoogle] as const;
};
