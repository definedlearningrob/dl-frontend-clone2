import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { createTeacherName } from '@pbl/components/User/Grading/helpers/createTeacherName';
import { useSchoolClassTeam } from '@pbl/graphql/user/hooks/useSchoolClassTeam';
import GradingCheckinActions from '@pbl/components/User/Grading/GradingCheckinActions';
import GradingStatus from '@pbl/components/User/Grading/GradingStatus/GradingStatus';
import useCheckinToGrade from '@pbl/graphql/user/hooks/useCheckinQuestionToGrade';
import useGradeCheckin from '@pbl/graphql/user/hooks/useGradeCheckinMutation';
import useUserInfo from '@pbl/hooks/useUserInfo';

import Card from '@shared/components/Card/Card';
import { TeamHeader } from '@shared/components/TeamHeader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { CheckInSubmissions } from '@shared/components/CheckIns';
import { TeamMemberList } from '@shared/components/TeamMemberList';
import { CONVERSATION_CONTEXT_TYPES, SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';
import { ReactComponent as EmptyCheckInsIcon } from '@shared/svg/check_in.svg';
import { callToast } from '@shared/components/Toaster/Toaster';

import GradingBodyMessaging from '../GradingBodyMessaging';
import { useGradingContext } from '../GradingContext';
import { parseCreatedDate } from '../helpers/parseCreatedOnDate';

import styles from './TeamGradingCheckinBody.module.sass';

export const TeamGradingCheckinBody = () => {
  const { t } = useTranslation();
  const { teamId, classId } = useParams<{ teamId: string; classId: string }>();

  const {
    navigation: { projectId, itemId, subjectId, isTeamGrading },
    gradeItem,
  } = useGradingContext();

  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useSchoolClassTeam({ classUuid: classId, teamUuid: teamId });

  const {
    data,
    loading: checkinLoading,
    error: checkinError,
  } = useCheckinToGrade(projectId, itemId, subjectId!, isTeamGrading);
  const {
    userInfo: { uuid },
  } = useUserInfo();
  const [mutate, { loading: gradeLoading }] = useGradeCheckin(projectId, itemId, isTeamGrading);

  const lastSubmissionDate = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.project.checkInQuestion.teamSubmission?.answers[0].updatedAt;
  }, [data]);

  if (!data) return null;
  if (teamLoading || checkinLoading || teamError || checkinError) {
    return <SharedLoadingSpinner size='small' />;
  }

  const { team } = teamData!.schoolClass;
  const answer = data.project.checkInQuestion?.teamSubmission;
  const isGraded = Boolean(answer?.grade);
  const status = answer?.grade?.status;
  const isGradingDisabled = !answer;

  const grade = async (status: SUBMISSION_GRADE_STATUS) => {
    try {
      await mutate(answer?.id!, status);
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
    <Card className={styles.card}>
      <Card.Header className={styles.cardHeader}>
        <TeamHeader memberCount={team.students.nodes.length} teamName={team.name} />
        {lastSubmissionDate && (
          <div className={styles.lastSubmissionDate}>
            {t('user.grading.lastSubmittedOn', {
              date: parseCreatedDate(lastSubmissionDate),
            })}
          </div>
        )}
      </Card.Header>
      <TeamMemberList teamMembers={team.students.nodes} />
      <Card.Body>
        <CheckInSubmissions
          submission={data.project.checkInQuestion.teamSubmission!}
          userUuid={uuid}
        />
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
      </Card.Body>
      {answer && (
        <Card.Footer className={styles.cardFooter}>
          <GradingBodyMessaging
            contextId={answer.id}
            type={CONVERSATION_CONTEXT_TYPES.TEAM_CHECK_IN_SUBMISSION}
          />
        </Card.Footer>
      )}
    </Card>
  );
};
