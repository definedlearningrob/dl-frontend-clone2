import { capitalize } from 'lodash-es';

import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';

import { SUBMISSION_STATUS } from '@shared/components/SubmissionStatusBadge';

export const getSubmissionStatusData = (
  status: PRODUCT_SUBMISSION_STATUS,
  gradePoints?: string | null
) => {
  const statusLabel = capitalize(status).replace(/[_]/g, ' ');
  const label = [statusLabel, gradePoints].filter(Boolean).join(' ');

  switch (status) {
    case PRODUCT_SUBMISSION_STATUS.DRAFT:
      return { label, value: SUBMISSION_STATUS.DRAFT };
    case PRODUCT_SUBMISSION_STATUS.SUBMITTED:
      return {
        label,
        value: SUBMISSION_STATUS.SUBMITTED,
      };
    case PRODUCT_SUBMISSION_STATUS.GRADED:
      return { label, value: SUBMISSION_STATUS.GRADED };
    case PRODUCT_SUBMISSION_STATUS.NOT_STARTED:
      return {
        label,
        value: SUBMISSION_STATUS.NOT_STARTED,
      };
  }
};
