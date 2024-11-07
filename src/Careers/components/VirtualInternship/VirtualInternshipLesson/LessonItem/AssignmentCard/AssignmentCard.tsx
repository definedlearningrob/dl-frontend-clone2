import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';

import { AssignmentCard as SharedAssignmentCard } from '@dc/components/Student/Lesson/Assignment/AssignmentCard/AssignmentCard';
import { useUpdateAssignmentSubmissionVI } from '@dc/graphql/student/hooks/useUpdateAssignmentSubmissionVI';
import { TAssignment } from '@dc/components/Student/Lesson/types';
import {
  ASSESSMENT_SUBMISSION_STATUS,
  DEFAULT_STATE_TRANSITION_DURATION_MS,
} from '@dc/resources/constants';

type Props = {
  assignment: TAssignment;
  virtualInternshipId: string;
  isPreviewOnly?: boolean;
};

export const AssignmentCard = ({ assignment, virtualInternshipId, isPreviewOnly }: Props) => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [updateAssignmentSubmission, { loading }] = useUpdateAssignmentSubmissionVI(opportunityId);
  const triggerSubmissionSuccessButtonState = () => {
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), DEFAULT_STATE_TRANSITION_DURATION_MS);
  };

  const isSubmitted = assignment.submission?.status === ASSESSMENT_SUBMISSION_STATUS.SUBMITTED;
  const isAssignmentSubmission =
    loading || isEmpty(assignment.submission?.files) || submitSuccess || !assignment.submission;

  const { submission } = assignment;
  const handleSubmission = async () => {
    try {
      const status = isSubmitted
        ? ASSESSMENT_SUBMISSION_STATUS.DRAFT
        : ASSESSMENT_SUBMISSION_STATUS.SUBMITTED;

      submission &&
        (await updateAssignmentSubmission({
          id: submission.id,
          status,
        }));

      !isSubmitted && triggerSubmissionSuccessButtonState();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };

  return (
    <SharedAssignmentCard
      key={assignment.id}
      assignment={assignment}
      contextId={virtualInternshipId}
      isPreviewOnly={isPreviewOnly}
      isSubmitting={isAssignmentSubmission}
      onSubmit={handleSubmission}
    />
  );
};
