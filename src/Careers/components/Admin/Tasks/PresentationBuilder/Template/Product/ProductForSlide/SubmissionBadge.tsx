import dayjs from 'dayjs';
import { findKey } from 'lodash-es';

import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';
import { createSubmissionPointsSummary } from '@pbl/components/Student/Project/Products/utils/createSubmissionPointsSummary';
import { getSubmissionStatusData } from '@pbl/components/Student/Project/Products/utils/getSubmissionStatusData';
import { TProductSubmission } from '@pbl/graphql/student/queries/projectProducts';

import { SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge';

type Props = {
  submission: TProductSubmission | null;
};

export const SubmissionBadge = ({ submission }: Props) => {
  const hasNewFiles = dayjs(submission?.grade?.updatedAt).isBefore(submission?.updatedAt);
  const isSubmitted = submission?.status === PRODUCT_SUBMISSION_STATUS.SUBMITTED;
  const isDraft = submission?.status === PRODUCT_SUBMISSION_STATUS.DRAFT;
  const isNotStarted = !submission?.status;
  const isGraded = isSubmitted && !!submission?.grade;

  const statusMap = {
    [PRODUCT_SUBMISSION_STATUS.GRADED]: isGraded,
    [PRODUCT_SUBMISSION_STATUS.SUBMITTED]: isSubmitted || hasNewFiles,
    [PRODUCT_SUBMISSION_STATUS.DRAFT]: isDraft,
    [PRODUCT_SUBMISSION_STATUS.NOT_STARTED]: isNotStarted,
  };

  const gradePoints = isGraded
    ? createSubmissionPointsSummary(
        submission.grade!.pointsAvailable,
        submission.grade!.pointsScored
      )
    : undefined;

  const status = findKey(statusMap, Boolean) as PRODUCT_SUBMISSION_STATUS;
  const submissionStatusData = getSubmissionStatusData(status, gradePoints);

  return (
    <SubmissionStatusBadge
      status={submissionStatusData.value}
      statusLabel={submissionStatusData.label}
    />
  );
};
