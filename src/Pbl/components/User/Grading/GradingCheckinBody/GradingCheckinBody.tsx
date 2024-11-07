import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import useGradeCheckin from '@pbl/graphql/user/hooks/useGradeCheckinMutation';
import useCheckinToGrade from '@pbl/graphql/user/hooks/useCheckinQuestionToGrade';
import useStudent from '@pbl/graphql/user/hooks/useStudent';

import SharedCard from '@shared/components/Card/Card';
import { Kicker } from '@shared/components/Kicker';
import { CONVERSATION_CONTEXT_TYPES, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { ReactComponent as EmptyCheckInsIcon } from '@shared/svg/check_in.svg';
import { callToast } from '@shared/components/Toaster/Toaster';

import { useGradingContext } from '../GradingContext/GradingContext';
import { createTeacherName } from '../helpers/createTeacherName';
import GradingCheckinActions from '../GradingCheckinActions';
import GradingBodyMessaging from '../GradingBodyMessaging';
import GradingStatus from '../GradingStatus/GradingStatus';
import GradingBodyHeader from '../GradingBodyHeader';

import styles from './GradingCheckinBody.module.sass';

const GradingCheckinBody = () => {
  const {
    navigation: { pickedStudent, projectId, itemId, subjectId, isTeamGrading },
    gradeItem,
  } = useGradingContext();
  const { t } = useTranslation();
  const [mutate, { loading: gradeLoading }] = useGradeCheckin(projectId, itemId);
  const {
    data,
    loading: checkinLoading,
    error: checkinError,
  } = useCheckinToGrade(projectId, itemId, subjectId!, isTeamGrading);
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useStudent(subjectId!, Boolean(pickedStudent));

  const loading = checkinLoading || studentLoading;
  const error = checkinError || studentError;

  if (loading || error || !data) return null;

  const answer = data.project.checkInQuestion.answer;
  const status = answer?.grade?.status;
  const isGraded = Boolean(answer?.grade);
  const isGradingDisabled = !answer;

  const grade = async (status: SUBMISSION_GRADE_STATUS) => {
    try {
      await mutate(answer!.id, status);
      gradeItem();
      callToast('success', t('user.grading.success'));
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('user.grading.error'));
      }
    }
  };

  return (
    <SharedCard className={styles.card} withoutPadding={true}>
      <SharedCard.Body className={styles.cardBody}>
        <GradingBodyHeader
          studentName={pickedStudent || studentData?.student.name}
          submittedOn={answer?.updatedAt}
        />
        {answer && (
          <div className={styles.checkinAnswerWrapper}>
            <Kicker>{t('user.grading.answer')}</Kicker>
            <span className={styles.checkinAnswer}>{answer.answer}</span>
          </div>
        )}
        {!isGradingDisabled && (
          <div className={styles.statusContainer}>
            <GradingStatus
              gradedBy={createTeacherName(
                answer?.grade?.lastGradedBy.firstName,
                answer?.grade?.lastGradedBy.lastName
              )}
              status={status}
              updatedAt={answer?.grade?.updatedAt}
            />
            <GradingCheckinActions grade={grade} isGraded={isGraded} loading={gradeLoading} />
          </div>
        )}
        {isGradingDisabled && (
          <div className={styles.emptyContainer}>
            <EmptyCheckInsIcon />
          </div>
        )}
      </SharedCard.Body>
      {answer && (
        <SharedCard.Footer className={styles.cardFooter}>
          <GradingBodyMessaging
            contextId={answer.id}
            type={CONVERSATION_CONTEXT_TYPES.CHECK_IN_ANSWER}
          />
        </SharedCard.Footer>
      )}
    </SharedCard>
  );
};
export default GradingCheckinBody;
