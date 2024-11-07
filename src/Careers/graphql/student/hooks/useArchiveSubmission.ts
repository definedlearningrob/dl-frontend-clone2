import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { compact } from 'lodash-es';

import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '@dc/graphql/student/queries/virtualInternshipLesson';
import deleteAssignmentSubmissionFileMutation from '@dc/graphql/student/mutations/deleteAssignmentSubmissionFile';
import COURSE_LESSON_QUERY from '@dc/graphql/student/queries/lessonInCourse';

import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  contextId: string;
  lessonId: string;
  isVirtualInternship: boolean;
  opportunityId?: string;
};

type submissionID = {
  id: string;
};

export const useArchiveSubmission = ({
  contextId,
  lessonId,
  isVirtualInternship,
  opportunityId,
}: Props) => {
  const { t } = useTranslation();
  const [deleteSubmissionFile, { loading: pendingDeletion }] = useMutation(
    deleteAssignmentSubmissionFileMutation
  );
  const archiveSubmissionHook = async ({ id }: submissionID) => {
    try {
      await deleteSubmissionFile({
        variables: { input: { id } },
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
      callToast('success', t('student.lesson.assignment.archivedFile'));
    } catch (error) {
      callToast('error', t('student.lesson.assignment.archiveError {{error}}'));
    }
  };

  return [archiveSubmissionHook, pendingDeletion] as const;
};
