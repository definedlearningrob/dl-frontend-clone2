import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useToggle } from 'react-use';

import { CONVERSATION_CONTEXT_TYPES, RECEIVER_TYPES } from '@dc/resources/constants';
import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TAssignment } from '@dc/components/Student/Lesson/types';

import { cleanInjection } from '@shared/utils/cleanInjection';
import { SUBMISSION_STATUS, SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge';
import SharedButton from '@shared/components/Button/Button';
import Modal from '@shared/components/Messaging/Modal/Modal';
import { Kicker } from '@shared/components/Kicker';
import { callToast } from '@shared/components/Toaster/Toaster';
import { ProductAlignedStatementsIcon } from '@shared/components/ProductAlignedStatementsIcon';

import { AssignmentCardActions } from './AssignmentCardActions';
import styles from './AssignmentCard.module.sass';
import { AssignmentDropzone } from './AssignmentDropzone';

type Props = {
  assignment: TAssignment;
  contextId: string;
  isSubmitting?: boolean;
  onSubmit: () => void;
  isPreviewOnly?: boolean;
  cardId?: string;
};

export const AssignmentCard = ({
  assignment,
  contextId,
  isSubmitting,
  onSubmit,
  isPreviewOnly,
  cardId,
}: Props) => {
  const { id, displayName, description, submission, rubrics } = assignment;
  const { t } = useTranslation();
  const [isModalVisible, toggleIsModalVisible] = useToggle(false);

  const isSubmitDisabled = isSubmitting || !submission;
  const isReSubmitted =
    submission && submission.grade && submission.updatedAt > submission.grade.updatedAt;
  const submissionStatus = useMemo(() => {
    if (!submission) {
      return SUBMISSION_STATUS.NOT_STARTED;
    }
    if (submission.status === SUBMISSION_STATUS.DRAFT) {
      return SUBMISSION_STATUS.DRAFT;
    }
    if (submission.rubricGrade) {
      return SUBMISSION_STATUS.GRADED;
    }
    if (isReSubmitted) {
      return SUBMISSION_STATUS.RE_SUBMITTED;
    }

    const status = submission.grade?.status || submission.status;

    return SUBMISSION_STATUS[status];
  }, [submission]);

  const submitButtonLabel = useMemo(() => {
    if (!submission) {
      return t('student.lesson.items.assignment.actions.submit');
    }

    return submissionStatus === SUBMISSION_STATUS.DRAFT
      ? t('student.lesson.items.assignment.actions.submit')
      : t('student.lesson.items.assignment.actions.unsubmit');
  }, [submission]);

  const onMessageSend = () => callToast('success', t('messaging.sentSuccessfully'));

  const defaultCardId = `${assignment.id}-${assignment.__typename}`;

  const grade = submission?.grade || submission?.rubricGrade;
  const isDraft = submissionStatus === SUBMISSION_STATUS.DRAFT;
  const gradePoints = `${submission?.rubricGrade?.pointsScored} / ${submission?.rubricGrade?.pointsAvailable}`;

  const rubricGradeLabel =
    submission?.rubricGrade && !isDraft
      ? `${t('user.student.coursesActivity.statuses.graded')} ${gradePoints}`
      : undefined;

  return (
    <LessonItemCard
      action={<AssignmentCardActions assignment={assignment} isPreviewOnly={isPreviewOnly} />}
      headerIcon={
        <ProductAlignedStatementsIcon
          message={t('lessons.assignment.alignedStatements')}
          rubrics={rubrics}
        />
      }
      id={cardId ?? defaultCardId}
      title={displayName}>
      <p
        className={styles.assignmentDescription}
        //eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={cleanInjection(description)}
      />
      <AssignmentDropzone assignment={assignment} contextId={contextId} disabled={isPreviewOnly} />
      <div className={styles.submissionFooter}>
        <div className={styles.submissionStatus}>
          <Kicker>{t('student.lesson.items.assignment.statusLabel')}</Kicker>
          <div className={styles.submissionStatusValue}>
            <SubmissionStatusBadge status={submissionStatus} statusLabel={rubricGradeLabel} />
            {grade && !isDraft && !isReSubmitted && (
              <span>
                {t('user.student.coursesActivity.by', {
                  name: grade.lastGradedBy.fullName,
                })}
              </span>
            )}
          </div>
        </div>
        <SharedButton
          data-testid='status-submit-button'
          disabled={isSubmitDisabled}
          size='md'
          variant='primary'
          onClick={onSubmit}>
          {submitButtonLabel}
        </SharedButton>
      </div>
      {isModalVisible && (
        <Modal
          context={{
            id,
            title: displayName,
            type: CONVERSATION_CONTEXT_TYPES.ASSIGNMENT,
          }}
          receiverType={RECEIVER_TYPES.USER}
          toggleModal={toggleIsModalVisible}
          onSuccess={onMessageSend}
        />
      )}
    </LessonItemCard>
  );
};
