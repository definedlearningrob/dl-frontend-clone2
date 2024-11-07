import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { findKey } from 'lodash-es';
import dayjs from 'dayjs';

import UPDATE_SUBMISSION, {
  UpdateProductSubmissionData,
  UpdateProductSubmissionVariables,
} from '@pbl/graphql/student/mutations/updateProductSubmission';
import { PRODUCT_SUBMISSION_STATUS } from '@pbl/resources/enums';
import { TProductSubmission } from '@pbl/graphql/student/queries/projectProducts';
import { getSubmissionStatusData } from '@pbl/components/Student/Project/Products/utils/getSubmissionStatusData';

import { SubmitDisabledStage } from '@shared/components/SubmitDisabledStage';
import SharedButton from '@shared/components/Button/Button';
import { SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge';
import { callToast } from '@shared/components/Toaster/Toaster';

import { createSubmissionPointsSummary } from '../utils/createSubmissionPointsSummary';

import styles from './ProductSubmissionFooter.module.sass';

type Props = {
  disabled: boolean;
  isLoading: boolean;
  newTeamMember?: boolean;
  submission: TProductSubmission | null;
  openModal: () => void;
};

export const ProductSubmissionFooter = ({
  disabled,
  isLoading,
  newTeamMember,
  submission,
}: Props) => {
  const [updateSubmission, { loading: updateLoading }] = useMutation<
    UpdateProductSubmissionData,
    UpdateProductSubmissionVariables
  >(UPDATE_SUBMISSION);
  const { t } = useTranslation();

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

  const handleStatusToggle = async () => {
    try {
      const status = isDraft
        ? PRODUCT_SUBMISSION_STATUS.SUBMITTED
        : PRODUCT_SUBMISSION_STATUS.DRAFT;
      await updateSubmission({
        variables: {
          input: {
            id: submission!.id,
            status,
          },
        },
      });
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('student.project.submissions.status.default'));
      }
    }
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
    <footer>
      {newTeamMember && (
        <SubmitDisabledStage className={styles.submitDisabledInfo} type='product' />
      )}
      <div className={styles.submissionStatusWrapper}>
        <SubmissionStatusBadge
          status={submissionStatusData.value}
          statusLabel={submissionStatusData.label}
        />
        <div className={styles.actions}>
          {!newTeamMember && (
            <SharedButton
              disabled={disabled}
              isLoading={isLoading || updateLoading}
              variant='primary'
              onClick={handleStatusToggle}>
              {isSubmitted ? t('common.actions.unsubmit') : t('common.actions.submit')}
            </SharedButton>
          )}
        </div>
      </div>
    </footer>
  );
};
